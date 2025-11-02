/**
 * Main Game File - The Entrepreneur's Journey
 * Linear maze with choices and consequences
 */

// ========================================
// TEXTURE SCALE CONFIGURATION
// Adjust these values to control texture size
// Higher numbers = smaller textures (more repeats)
// Lower numbers = larger textures (fewer repeats)
// ========================================
const TEXTURE_CONFIG = {
    wallRepeat: 2,      // Wall texture scale (brick, stone, mossy)
    floorRepeat: 64,    // Floor texture scale
    ceilingRepeat: 56   // Ceiling texture scale
};

// MAP CONFIGURATION - Edit this to design your maze!
// 1 = Wall, 0 = Empty space, 2 = Player start position
const MAP = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,0,1,0,1,0,1,1,1,0,1,0,1,1,1,0,1,1,1,0,1,0,1,1,1,0,1,0,1,1,1,0,1,0,1,0,1,1,1,0,1,1,1,1,1,1,1],
    [1,0,0,0,1,0,1,0,1,0,1,0,0,0,1,0,1,0,0,0,1,0,1,0,0,0,1,0,1,0,0,0,1,0,1,0,0,0,1,0,1,0,0,0,1,0,0,0,1,0,1],
    [1,1,1,0,1,0,1,0,1,0,1,1,1,0,1,0,1,1,0,1,1,0,1,0,1,0,1,1,1,0,1,0,1,0,1,1,0,1,1,0,1,0,1,0,1,1,0,1,0,1,1],
    [1,0,0,0,0,0,0,1,0,0,0,1,0,0,1,0,0,0,0,1,0,0,0,1,0,0,1,0,0,1,0,0,0,1,0,0,1,0,0,1,0,0,0,1,0,0,0,1,0,1,1],
    [1,0,1,1,1,1,0,1,1,1,1,0,1,1,0,1,1,1,1,0,1,1,0,1,1,1,1,0,1,1,0,1,1,1,1,0,1,1,0,1,1,1,1,0,1,1,0,1,1,1,1],
    [1,0,1,0,0,0,0,0,1,0,0,1,0,0,1,0,0,0,0,0,1,0,1,0,0,0,0,1,0,1,0,0,0,1,0,0,1,0,0,1,0,0,0,0,1,0,0,0,0,1,1],
    [1,0,1,0,1,1,1,0,1,0,1,1,0,1,1,0,1,1,1,0,1,0,1,1,0,1,1,0,1,1,1,0,1,0,1,1,0,1,1,0,1,0,1,1,0,1,1,1,0,1,1],
    [1,0,1,0,0,0,0,0,0,1,0,0,0,1,0,0,1,0,1,0,0,0,1,0,0,0,0,1,0,1,0,0,1,0,1,0,0,0,1,0,0,0,1,0,1,0,0,1,0,1,1],
    [1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,0,1,1,0,1,1,1,0,1,1,1,1,0,1,1,0,1,1,1,1,0,1,1,0,1,1,1,1,0,1,1,0,1,1,1,1],
    [1,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,1,0,0,0,0,1,0,0,1,0,0,0,1,0,0,0,0,1,0,0,1,0,0,0,1,0,1],
    [1,1,1,1,1,1,1,0,1,1,1,0,1,1,1,1,0,1,1,1,0,1,1,1,1,2,1,1,1,0,1,1,1,0,1,1,1,0,1,1,1,0,1,1,1,0,1,1,1,0,1],
    [1,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,1,0,0,0,0,1,0,0,1,0,0,0,1,0,0,0,0,1,0,0,1,0,0,0,1,0,1],
    [1,1,1,0,1,1,1,0,1,0,1,0,1,0,1,1,0,1,1,0,1,0,1,1,1,0,1,1,1,0,1,1,1,0,1,0,1,0,1,1,0,1,1,0,1,0,1,1,0,1,1],
    [1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,1,0,0,0,1,0,0,0,1,0,1,0,0,0,1,0,1,0,0,0,1,0,1,0,1,0,0,0,1],
    [1,1,1,0,1,1,1,1,1,0,1,1,1,0,1,1,1,1,0,1,1,0,1,1,1,0,1,1,1,0,1,1,1,0,1,1,1,0,1,1,1,0,1,1,1,0,1,1,1,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
];


const TILE_SIZE = 3; // Size of each tile in 3D units

let engine;
let gameState = {
    currentLevel: 0,
    isPlaying: false,
    hasStarted: false
};

// Minimap variables
let minimapCanvas;
let minimapCtx;
const MINIMAP_SCALE = 8; // Pixels per tile (bigger)
const MINIMAP_SIZE = 300; // Size of minimap in pixels (bigger)

// Wait for DOM to load
window.addEventListener('DOMContentLoaded', () => {
    init();
});

function init() {
    // Show intro screen
    showIntroScreen();
    
    // Create engine
    engine = new RayCastEngine();
    
    // Apply texture configuration
    engine.textureScales.wallRepeat = TEXTURE_CONFIG.wallRepeat;
    engine.textureScales.floorRepeat = TEXTURE_CONFIG.floorRepeat;
    engine.textureScales.ceilingRepeat = TEXTURE_CONFIG.ceilingRepeat;
    
    // Setup minimap
    initMinimap();
    
    // Load textures first, then build the scene
    engine.loadTexturesAndStart(() => {
        // Textures are loaded, now build the maze
        createMaze();
        
        // Hide loading screen
        document.getElementById('loading').style.display = 'none';
    });
    
    // Setup button listeners
    document.getElementById('start-btn').addEventListener('click', startGame);
    document.getElementById('restart-btn').addEventListener('click', restartGame);
    document.getElementById('restart-success-btn').addEventListener('click', restartGame);
    
    console.log('Game initialized!');
    console.log('Texture scales:', TEXTURE_CONFIG);
}

function initMinimap() {
    minimapCanvas = document.getElementById('minimap');
    minimapCtx = minimapCanvas.getContext('2d');
    
    // Set canvas size based on map
    const mapWidth = MAP[0].length;
    const mapHeight = MAP.length;
    minimapCanvas.width = Math.min(mapWidth * MINIMAP_SCALE, MINIMAP_SIZE);
    minimapCanvas.height = Math.min(mapHeight * MINIMAP_SCALE, MINIMAP_SIZE);
    
    console.log('Minimap initialized');
}

function showIntroScreen() {
    document.getElementById('intro-screen').classList.remove('hidden');
}

function startGame() {
    document.getElementById('intro-screen').classList.add('hidden');
    gameState.isPlaying = true;
    gameState.hasStarted = true;
    gameState.currentLevel = 0;
    
    // Maze is already built after texture loading
    
    // Start the engine
    engine.start();
    
    // Show first level info
    showLevelInfo(0);
    
    console.log('Game started!');
}

function restartGame() {
    document.getElementById('game-over-screen').classList.add('hidden');
    document.getElementById('success-screen').classList.add('hidden');
    
    gameState.currentLevel = 0;
    gameState.isPlaying = true;
    
    clearScene();
    createMaze();
    
    // Recalculate player start position from map
    const mapHeight = MAP.length;
    const mapWidth = MAP[0].length;
    const offsetX = -(mapWidth * TILE_SIZE) / 2;
    const offsetZ = -(mapHeight * TILE_SIZE) / 2;
    
    for (let row = 0; row < mapHeight; row++) {
        for (let col = 0; col < mapWidth; col++) {
            if (MAP[row][col] === 2) {
                const x = offsetX + col * TILE_SIZE + TILE_SIZE / 2;
                const z = offsetZ + row * TILE_SIZE + TILE_SIZE / 2;
                engine.player.position.set(x, 0, z);
                break;
            }
        }
    }
    
    engine.rotation.yaw = 0;
    engine.rotation.pitch = 0;
    
    showLevelInfo(0);
}

function clearScene() {
    while(engine.walls.length > 0) {
        let wall = engine.walls.pop();
        engine.scene.remove(wall);
    }
    // Remove any sprites (signs)
    const spritesToRemove = [];
    engine.scene.traverse((object) => {
        if (object instanceof THREE.Sprite || (object instanceof THREE.Mesh && object.geometry instanceof THREE.CylinderGeometry)) {
            spritesToRemove.push(object);
        }
    });
    spritesToRemove.forEach(sprite => engine.scene.remove(sprite));
    
    if (engine.floor) {
        engine.scene.remove(engine.floor);
        engine.floor = null;
    }
    if (engine.ceiling) {
        engine.scene.remove(engine.ceiling);
        engine.ceiling = null;
    }
    if (engine.triggerZones) {
        engine.triggerZones = [];
    }
}

function createMaze() {
    engine.triggerZones = [];
    
    // Calculate map dimensions
    const mapHeight = MAP.length;
    const mapWidth = MAP[0].length;
    const totalWidth = mapWidth * TILE_SIZE;
    const totalDepth = mapHeight * TILE_SIZE;
    
    console.log('=== CREATING MAZE ===');
    console.log(`Map size: ${mapWidth} x ${mapHeight}`);
    console.log(`World size: ${totalWidth} x ${totalDepth}`);
    console.log(`Tile size: ${TILE_SIZE}`);
    
    // Create floor and ceiling based on map size
    engine.createFloor(totalWidth, totalDepth, 0xFFFFFF);
    engine.createCeiling(totalWidth, totalDepth, 4, 0xFFFFFF);
    
    const wallHeight = 4;
    const wallThickness = TILE_SIZE;
    
    // Build maze from MAP array
    buildMazeFromMap();
}

// Build the maze from the MAP array
function buildMazeFromMap() {
    const mapHeight = MAP.length;
    const mapWidth = MAP[0].length;
    const wallHeight = 4;
    
    // Calculate offset to center the map
    const offsetX = -(mapWidth * TILE_SIZE) / 2;
    const offsetZ = -(mapHeight * TILE_SIZE) / 2;
    
    let playerStartX = 0;
    let playerStartZ = 0;
    let wallCount = 0;
    
    // Loop through the map array
    for (let row = 0; row < mapHeight; row++) {
        for (let col = 0; col < mapWidth; col++) {
            const cell = MAP[row][col];
            
            // Calculate 3D position
            const x = offsetX + col * TILE_SIZE + TILE_SIZE / 2;
            const z = offsetZ + row * TILE_SIZE + TILE_SIZE / 2;
            
            if (cell === 1) {
                // Create a wall
                engine.createWall(x, 0, z, TILE_SIZE, wallHeight, TILE_SIZE, 0x8B4513);
                wallCount++;
            } else if (cell === 2) {
                // Player start position
                playerStartX = x;
                playerStartZ = z;
                console.log(`Found player spawn at row ${row}, col ${col}`);
            }
            // cell === 0 means empty space (no wall)
        }
    }
    
    console.log(`Created ${wallCount} wall blocks`);
    
    // Set player starting position
    engine.player.position.set(playerStartX, 0, playerStartZ);
    console.log(`Player spawned at: (${playerStartX.toFixed(2)}, 0, ${playerStartZ.toFixed(2)})`);
}



function createSign(choice, x, z) {
    const postGeometry = new THREE.CylinderGeometry(0.1, 0.1, 2, 8);
    const postMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
    const post = new THREE.Mesh(postGeometry, postMaterial);
    post.position.set(x, 1, z);
    engine.scene.add(post);
    
    const signGeometry = new THREE.BoxGeometry(2.5, 1, 0.1);
    const signColor = choice.type === 'good' ? 0x32CD32 : 0xDC143C;
    const signMaterial = new THREE.MeshStandardMaterial({ color: signColor });
    const sign = new THREE.Mesh(signGeometry, signMaterial);
    sign.position.set(x, 2.5, z);
    engine.scene.add(sign);
    
    createTextSprite(choice.sign, x, 2.5, z - 0.2);
}

function createTextSprite(text, x, y, z) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = 512;
    canvas.height = 256;
    
    context.fillStyle = '#FFFFFF';
    context.font = 'Bold 40px Arial';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    
    const words = text.split(' ');
    let line = '';
    let y_pos = 128;
    const maxWidth = 480;
    
    words.forEach((word, i) => {
        const testLine = line + word + ' ';
        const metrics = context.measureText(testLine);
        if (metrics.width > maxWidth && i > 0) {
            context.fillText(line, 256, y_pos);
            line = word + ' ';
            y_pos += 50;
        } else {
            line = testLine;
        }
    });
    context.fillText(line, 256, y_pos);
    
    const texture = new THREE.CanvasTexture(canvas);
    const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
    const sprite = new THREE.Sprite(spriteMaterial);
    sprite.position.set(x, y, z);
    sprite.scale.set(2, 1, 1);
    
    engine.scene.add(sprite);
}

function createTriggerZone(choice, x, z, width, length, levelIndex) {
    const trigger = {
        choice: choice,
        levelIndex: levelIndex,
        bounds: {
            minX: x - width / 2,
            maxX: x + width / 2,
            minZ: z - length / 2,
            maxZ: z + length / 2
        }
    };
    
    engine.triggerZones.push(trigger);
}

function checkTriggers() {
    // Disabled - no triggers for now
    return;
}

function onChoiceMade(choice, levelIndex) {
    gameState.isPlaying = false;
    
    if (choice.gameOver) {
        showGameOver(choice);
    } else if (choice.isWinning) {
        showSuccess();
    } else {
        gameState.currentLevel = levelIndex + 1;
        
        if (gameState.currentLevel < STORYLINE.levels.length) {
            showLevelInfo(gameState.currentLevel);
            setTimeout(() => {
                gameState.isPlaying = true;
            }, 3000);
        } else {
            showSuccess();
        }
    }
}

function showLevelInfo(levelIndex) {
    // Disabled - no levels for now
    document.getElementById('level-title').textContent = 'Texture Demo';
    document.getElementById('level-description').textContent = 'Walk around to see the different textures on walls, floor, and ceiling!';
}

function showGameOver(choice) {
    document.exitPointerLock();
    
    document.getElementById('game-over-title').textContent = '❌ Game Over ❌';
    document.getElementById('game-over-feedback').textContent = choice.feedback;
    document.getElementById('lesson-text').textContent = choice.lesson;
    document.getElementById('quote-text').textContent = choice.quote;
    
    document.getElementById('game-over-screen').classList.remove('hidden');
}

function showSuccess() {
    document.exitPointerLock();
    
    const ending = STORYLINE.successEnding;
    document.getElementById('success-title').textContent = ending.title;
    document.getElementById('success-message').innerHTML = `
        <p>${ending.message}</p>
        <p><strong>${ending.achievement}</strong></p>
    `;
    
    const mindsetsList = ending.mindsets.map(m => `<p>${m}</p>`).join('');
    document.getElementById('mindsets-list').innerHTML = `<h3>🌟 Entrepreneurial Mindsets Unlocked:</h3>${mindsetsList}`;
    
    document.getElementById('success-quote').textContent = ending.finalQuote;
    
    document.getElementById('success-screen').classList.remove('hidden');
}

setTimeout(() => {
    if (engine && engine.update) {
        const originalUpdate = engine.update.bind(engine);
        engine.update = function() {
            this.updatePlayerMovement();
            checkTriggers();
            updateMinimap(); // Update minimap every frame
            this.renderer.render(this.scene, this.camera);
        };
    }
}, 100);

// Update and render the minimap
function updateMinimap() {
    if (!minimapCtx || !engine) return;
    
    const mapWidth = MAP[0].length;
    const mapHeight = MAP.length;
    
    // Clear canvas
    minimapCtx.clearRect(0, 0, minimapCanvas.width, minimapCanvas.height);
    
    // Draw map with better styling
    for (let row = 0; row < mapHeight; row++) {
        for (let col = 0; col < mapWidth; col++) {
            const cell = MAP[row][col];
            const x = col * MINIMAP_SCALE;
            const y = row * MINIMAP_SCALE;
            
            if (cell === 1) {
                // Wall - gradient effect
                const gradient = minimapCtx.createLinearGradient(x, y, x + MINIMAP_SCALE, y + MINIMAP_SCALE);
                gradient.addColorStop(0, '#6B4423');
                gradient.addColorStop(1, '#4A2F1A');
                minimapCtx.fillStyle = gradient;
                minimapCtx.fillRect(x, y, MINIMAP_SCALE, MINIMAP_SCALE);
                
                // Wall border for depth
                minimapCtx.strokeStyle = '#3A1F0A';
                minimapCtx.lineWidth = 0.5;
                minimapCtx.strokeRect(x, y, MINIMAP_SCALE, MINIMAP_SCALE);
            } else {
                // Empty space - lighter with subtle grid
                minimapCtx.fillStyle = '#1a1a1a';
                minimapCtx.fillRect(x, y, MINIMAP_SCALE, MINIMAP_SCALE);
                
                // Subtle grid lines
                minimapCtx.strokeStyle = '#252525';
                minimapCtx.lineWidth = 0.5;
                minimapCtx.strokeRect(x, y, MINIMAP_SCALE, MINIMAP_SCALE);
            }
        }
    }
    
    // Draw player position
    const offsetX = -(mapWidth * TILE_SIZE) / 2;
    const offsetZ = -(mapHeight * TILE_SIZE) / 2;
    
    const playerX = engine.player.position.x;
    const playerZ = engine.player.position.z;
    
    // Convert world position to map coordinates
    const mapX = (playerX - offsetX) / TILE_SIZE;
    const mapZ = (playerZ - offsetZ) / TILE_SIZE;
    
    const playerScreenX = mapX * MINIMAP_SCALE;
    const playerScreenY = mapZ * MINIMAP_SCALE;
    
    // Draw player glow effect
    const glowGradient = minimapCtx.createRadialGradient(
        playerScreenX, playerScreenY, 0,
        playerScreenX, playerScreenY, MINIMAP_SCALE * 2
    );
    glowGradient.addColorStop(0, 'rgba(0, 255, 0, 0.5)');
    glowGradient.addColorStop(1, 'rgba(0, 255, 0, 0)');
    minimapCtx.fillStyle = glowGradient;
    minimapCtx.fillRect(
        playerScreenX - MINIMAP_SCALE * 2,
        playerScreenY - MINIMAP_SCALE * 2,
        MINIMAP_SCALE * 4,
        MINIMAP_SCALE * 4
    );
    
    // Draw player as a circle with border
    minimapCtx.fillStyle = '#00FF00';
    minimapCtx.strokeStyle = '#00AA00';
    minimapCtx.lineWidth = 2;
    minimapCtx.beginPath();
    minimapCtx.arc(
        playerScreenX,
        playerScreenY,
        MINIMAP_SCALE * 0.6,
        0,
        Math.PI * 2
    );
    minimapCtx.fill();
    minimapCtx.stroke();
    
    // Draw player direction indicator (FIXED - negated dirX)
    const dirLength = MINIMAP_SCALE * 1.2;
    const dirX = -Math.sin(engine.rotation.yaw) * dirLength; // FIXED: Added negative
    const dirZ = -Math.cos(engine.rotation.yaw) * dirLength;
    
    minimapCtx.strokeStyle = '#FFFF00';
    minimapCtx.lineWidth = 3;
    minimapCtx.lineCap = 'round';
    minimapCtx.beginPath();
    minimapCtx.moveTo(playerScreenX, playerScreenY);
    minimapCtx.lineTo(
        playerScreenX + dirX,
        playerScreenY + dirZ
    );
    minimapCtx.stroke();
    
    // Draw arrow head
    const arrowSize = MINIMAP_SCALE * 0.4;
    const angle = Math.atan2(dirZ, dirX);
    
    minimapCtx.fillStyle = '#FFFF00';
    minimapCtx.beginPath();
    minimapCtx.moveTo(playerScreenX + dirX, playerScreenY + dirZ);
    minimapCtx.lineTo(
        playerScreenX + dirX - arrowSize * Math.cos(angle - Math.PI / 6),
        playerScreenY + dirZ - arrowSize * Math.sin(angle - Math.PI / 6)
    );
    minimapCtx.lineTo(
        playerScreenX + dirX - arrowSize * Math.cos(angle + Math.PI / 6),
        playerScreenY + dirZ - arrowSize * Math.sin(angle + Math.PI / 6)
    );
    minimapCtx.closePath();
    minimapCtx.fill();
}
