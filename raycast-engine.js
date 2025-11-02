/**
 * RayCastEngine - A 3D raycasting engine using Three.js
 * Uses proper vector-based raycasting to avoid fisheye effect
 */

class RayCastEngine {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.raycaster = new THREE.Raycaster();
        
        // Player properties
        this.player = {
            position: new THREE.Vector3(0, 0, 0),
            velocity: new THREE.Vector3(0, 0, 0),
            direction: new THREE.Vector3(0, 0, -1),
            height: 1.6, // Player eye height
            speed: 5.0,
            sprintSpeed: 8.0,
            rotationSpeed: 0.002
        };
        
        // Controls
        this.keys = {};
        this.mouse = { x: 0, y: 0, locked: false };
        this.rotation = { yaw: 0, pitch: 0 };
        
        // World
        this.walls = [];
        this.floor = null;
        this.ceiling = null;
        
        // Textures
        this.textureLoader = new THREE.TextureLoader();
        this.textures = {
            brick: null,
            stone: null,
            wood: null,
            floor: null,
            floorNormal: null,      // Normal map for floor (adds depth)
            floorRoughness: null,   // Roughness map for floor
            ceiling: null,
            grass: null,
            bluestone: null,
            mossy: null,
            colorstone: null
        };
        
        // TEXTURE SCALE SETTINGS - Adjust these to fit textures correctly!
        this.textureScales = {
            wallRepeat: 4,      // How many times texture repeats on walls (higher = smaller texture)
            floorRepeat: 32,    // How many times texture repeats on floor
            ceilingRepeat: 32   // How many times texture repeats on ceiling
        };
        
        // Time
        this.clock = new THREE.Clock();
        this.deltaTime = 0;
        
        this.init();
    }
    
    init() {
        // Create scene
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x87CEEB); // Sky blue
        this.scene.fog = new THREE.Fog(0x87CEEB, 10, 50);
        
        // Create camera (First-person perspective)
        this.camera = new THREE.PerspectiveCamera(
            75, // FOV
            window.innerWidth / window.innerHeight,
            0.1,
            100
        );
        this.camera.position.copy(this.player.position);
        this.camera.position.y = this.player.height;
        
        // Create renderer
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        document.getElementById('game-container').appendChild(this.renderer.domElement);
        
        // Add lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        this.scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.4);
        directionalLight.position.set(5, 10, 5);
        this.scene.add(directionalLight);
        
        // Setup controls
        this.setupControls();
        
        // Handle window resize
        window.addEventListener('resize', () => this.onWindowResize());
        
        console.log('RayCast Engine initialized');
    }
    
    // Call this after engine is initialized to load textures
    loadTexturesAndStart(callback) {
        this.loadTextures(callback);
    }
    
    loadTextures(callback) {
        // Load actual texture files from ./pics folder
        let loadedCount = 0;
        const totalTextures = 9; // Back to 9 (removed extra floor maps for speed)
        
        const onLoad = () => {
            loadedCount++;
            console.log(`Loaded ${loadedCount}/${totalTextures} textures`);
            if (loadedCount === totalTextures) {
                console.log('All textures loaded successfully!');
                if (callback) callback();
            }
        };
        
        const onError = (err) => {
            console.error('Error loading texture:', err);
        };
        
        // Wall textures
        this.textures.brick = this.textureLoader.load('./wood_inlaid_stone_wall_2k/textures/wood_inlaid_stone_wall_diff_2k.jpg', onLoad, undefined, onError);
        this.textures.brick.wrapS = THREE.RepeatWrapping;
        this.textures.brick.wrapT = THREE.RepeatWrapping;
        this.textures.brick.repeat.set(this.textureScales.wallRepeat, this.textureScales.wallRepeat);
        
        this.textures.stone = this.textureLoader.load('./pics/greystone.png', onLoad, undefined, onError);
        this.textures.stone.wrapS = THREE.RepeatWrapping;
        this.textures.stone.wrapT = THREE.RepeatWrapping;
        this.textures.stone.repeat.set(this.textureScales.wallRepeat, this.textureScales.wallRepeat);
        
        this.textures.wood = this.textureLoader.load('./pics/wood.png', onLoad, undefined, onError);
        this.textures.wood.wrapS = THREE.RepeatWrapping;
        this.textures.wood.wrapT = THREE.RepeatWrapping;
        this.textures.wood.repeat.set(this.textureScales.wallRepeat, this.textureScales.wallRepeat);
        
        this.textures.bluestone = this.textureLoader.load('./pics/bluestone.png', onLoad, undefined, onError);
        this.textures.bluestone.wrapS = THREE.RepeatWrapping;
        this.textures.bluestone.wrapT = THREE.RepeatWrapping;
        this.textures.bluestone.repeat.set(this.textureScales.wallRepeat, this.textureScales.wallRepeat);
        
        this.textures.mossy = this.textureLoader.load('./pics/mossy.png', onLoad, undefined, onError);
        this.textures.mossy.wrapS = THREE.RepeatWrapping;
        this.textures.mossy.wrapT = THREE.RepeatWrapping;
        this.textures.mossy.repeat.set(this.textureScales.wallRepeat, this.textureScales.wallRepeat);
        
        this.textures.colorstone = this.textureLoader.load('./pics/colorstone.png', onLoad, undefined, onError);
        this.textures.colorstone.wrapS = THREE.RepeatWrapping;
        this.textures.colorstone.wrapT = THREE.RepeatWrapping;
        this.textures.colorstone.repeat.set(this.textureScales.wallRepeat, this.textureScales.wallRepeat);
        
        // Floor texture (2K version for faster loading)
        // Using ONLY the color map for fastest loading
        this.textures.floor = this.textureLoader.load('./wood_floor_2k/textures/wood_floor_diff_2k.jpg', onLoad, undefined, onError);
        this.textures.floor.wrapS = THREE.RepeatWrapping;
        this.textures.floor.wrapT = THREE.RepeatWrapping;
        this.textures.floor.repeat.set(this.textureScales.floorRepeat, this.textureScales.floorRepeat);
        
        // NOTE: Normal and AO maps commented out for faster loading
        // Uncomment these if you want better quality (but slower loading):
        // this.textures.floorNormal = this.textureLoader.load('./wood_floor_2k/textures/wood_floor_disp_2k.png', onLoad, undefined, onError);
        // this.textures.floorRoughness = this.textureLoader.load('./wood_floor_2k/textures/wood_floor_ao_2k.jpg', onLoad, undefined, onError);
        
        // Ceiling texture
        this.textures.ceiling = this.textureLoader.load('./pics/wood.png', onLoad, undefined, onError);
        this.textures.ceiling.wrapS = THREE.RepeatWrapping;
        this.textures.ceiling.wrapT = THREE.RepeatWrapping;
        this.textures.ceiling.repeat.set(this.textureScales.ceilingRepeat, this.textureScales.ceilingRepeat);
        
        // Grass texture (use mossy for green walls)
        this.textures.grass = this.textureLoader.load('./pics/mossy.png', onLoad, undefined, onError);
        this.textures.grass.wrapS = THREE.RepeatWrapping;
        this.textures.grass.wrapT = THREE.RepeatWrapping;
        this.textures.grass.repeat.set(this.textureScales.wallRepeat, this.textureScales.wallRepeat);
        
        console.log('Starting to load textures from ./pics folder');
    }
    
    setupControls() {
        // Keyboard controls
        document.addEventListener('keydown', (e) => {
            this.keys[e.code] = true;
            
            // ESC to unlock pointer
            if (e.code === 'Escape') {
                document.exitPointerLock();
            }
        });
        
        document.addEventListener('keyup', (e) => {
            this.keys[e.code] = false;
        });
        
        // Mouse controls
        document.addEventListener('click', () => {
            if (!this.mouse.locked) {
                this.renderer.domElement.requestPointerLock();
            }
        });
        
        document.addEventListener('pointerlockchange', () => {
            this.mouse.locked = document.pointerLockElement === this.renderer.domElement;
        });
        
        document.addEventListener('mousemove', (e) => {
            if (this.mouse.locked) {
                this.rotation.yaw -= e.movementX * this.player.rotationSpeed;
                this.rotation.pitch -= e.movementY * this.player.rotationSpeed;
                
                // Clamp pitch to prevent flipping
                this.rotation.pitch = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, this.rotation.pitch));
            }
        });
    }
    
    createWall(x, y, z, width, height, depth, color = 0x8B4513) {
        const geometry = new THREE.BoxGeometry(width, height, depth);
        
        // Choose texture based on color
        let texture = this.textures.brick; // Red brick for brown walls
        if (color === 0x4a7c4e) {
            texture = this.textures.mossy; // Mossy texture for green walls
        } else if (color === 0x8B0000) {
            texture = this.textures.colorstone; // Color stone for red walls
        }
        
        // Ensure texture is loaded
        if (!texture) {
            console.warn('Texture not loaded yet, using fallback color');
        }
        
        const material = new THREE.MeshStandardMaterial({ 
            map: texture,
            roughness: 0.8,
            metalness: 0.2,
            side: THREE.DoubleSide
        });
        
        const wall = new THREE.Mesh(geometry, material);
        wall.position.set(x, y + height / 2, z);
        wall.castShadow = true;
        wall.receiveShadow = true;
        
        this.scene.add(wall);
        this.walls.push(wall);
        return wall;
    }
    
    createFloor(width, depth, color = 0x228B22) {
        const geometry = new THREE.PlaneGeometry(width, depth);
        const material = new THREE.MeshStandardMaterial({ 
            map: this.textures.floor,
            // Normal and roughness maps disabled for faster loading
            // normalMap: this.textures.floorNormal,
            // roughnessMap: this.textures.floorRoughness,
            roughness: 0.9,
            metalness: 0.1,
            side: THREE.DoubleSide
        });
        this.floor = new THREE.Mesh(geometry, material);
        this.floor.rotation.x = -Math.PI / 2; // Rotate to be horizontal
        this.floor.position.y = 0; // Place at ground level
        this.floor.receiveShadow = true;
        
        this.scene.add(this.floor);
        return this.floor;
    }
    
    createCeiling(width, depth, height, color = 0x696969) {
        const geometry = new THREE.PlaneGeometry(width, depth);
        const material = new THREE.MeshStandardMaterial({ 
            map: this.textures.ceiling,
            roughness: 0.9,
            metalness: 0.1,
            side: THREE.DoubleSide
        });
        this.ceiling = new THREE.Mesh(geometry, material);
        this.ceiling.rotation.x = Math.PI / 2; // Rotate to be horizontal (facing down)
        this.ceiling.position.y = height; // Place at ceiling height
        
        this.scene.add(this.ceiling);
        return this.ceiling;
    }
    
    updatePlayerMovement() {
        this.deltaTime = this.clock.getDelta();
        
        // Calculate movement direction based on camera orientation
        const forward = new THREE.Vector3();
        const right = new THREE.Vector3();
        
        // Get forward direction (only XZ plane, no vertical component)
        forward.set(
            -Math.sin(this.rotation.yaw),
            0,
            -Math.cos(this.rotation.yaw)
        ).normalize();
        
        // Get right direction
        right.set(
            Math.cos(this.rotation.yaw),
            0,
            -Math.sin(this.rotation.yaw)
        ).normalize();
        
        // Calculate movement
        const movement = new THREE.Vector3();
        const speed = this.keys['ShiftLeft'] ? this.player.sprintSpeed : this.player.speed;
        
        if (this.keys['KeyW']) movement.add(forward);
        if (this.keys['KeyS']) movement.sub(forward);
        if (this.keys['KeyD']) movement.add(right);
        if (this.keys['KeyA']) movement.sub(right);
        
        // Normalize diagonal movement
        if (movement.length() > 0) {
            movement.normalize().multiplyScalar(speed * this.deltaTime);
        }
        
        // Check collision BEFORE moving (predict next position)
        if (movement.length() > 0) {
            const newPosition = this.player.position.clone().add(movement);
            
            // Check X axis movement separately
            const testPosX = this.player.position.clone();
            testPosX.x = newPosition.x;
            if (!this.checkCollision(testPosX)) {
                this.player.position.x = newPosition.x;
            }
            
            // Check Z axis movement separately (allows sliding along walls)
            const testPosZ = this.player.position.clone();
            testPosZ.z = newPosition.z;
            if (!this.checkCollision(testPosZ)) {
                this.player.position.z = newPosition.z;
            }
        }
        
        // Update camera position
        this.camera.position.copy(this.player.position);
        this.camera.position.y = this.player.height;
        
        // Update camera rotation (NO FISHEYE - proper vector rotation)
        this.camera.quaternion.setFromEuler(
            new THREE.Euler(this.rotation.pitch, this.rotation.yaw, 0, 'YXZ')
        );
    }
    
    checkCollision(testPosition) {
        const playerRadius = 0.4; // Slightly larger for better feel
        const playerHeight = this.player.height;
        
        // Create bounding box for player at test position
        const playerBox = new THREE.Box3(
            new THREE.Vector3(
                testPosition.x - playerRadius,
                0,
                testPosition.z - playerRadius
            ),
            new THREE.Vector3(
                testPosition.x + playerRadius,
                playerHeight * 1.5,
                testPosition.z + playerRadius
            )
        );
        
        // Check collision with all walls
        for (let wall of this.walls) {
            const wallBox = new THREE.Box3().setFromObject(wall);
            if (wallBox.intersectsBox(playerBox)) {
                return true; // Collision detected
            }
        }
        
        return false; // No collision
    }
    
    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
    
    update() {
        this.updatePlayerMovement();
        this.renderer.render(this.scene, this.camera);
    }
    
    start() {
        const animate = () => {
            requestAnimationFrame(animate);
            this.update();
        };
        animate();
    }
}
