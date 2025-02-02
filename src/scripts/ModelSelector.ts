import { Behaviour, GameObject, serializable } from "@needle-tools/engine";
import * as THREE from "three";

export class ModelSelector extends Behaviour {
    
    @serializable(THREE.Color)
    highlightColor: THREE.Color = new THREE.Color(0xff0000); // Red color for selection

    private raycaster = new THREE.Raycaster();
    private pointer = new THREE.Vector2();
    private selectedObject: THREE.Object3D | null = null;
    private originalMaterial: THREE.Material | null = null;

    // start() {
    //     window.addEventListener("pointerdown", (event) => this.onPointerDown(event));
    //     console.log("ModelSelector script is active!");

    // }

    start() {
        if (!this.onPointerDownBound) {
            this.onPointerDownBound = this.onPointerDown.bind(this);
            window.addEventListener("pointerdown", this.onPointerDownBound);
        }
    }
    

    onPointerDown(event: PointerEvent) {
        // Convert screen coordinates to normalized device coordinates (-1 to +1)
        this.pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

        // Perform raycasting
        this.raycaster.setFromCamera(this.pointer, this.context.mainCamera);
        const intersects = this.raycaster.intersectObjects(this.getSelectableObjects(), true);

        if (intersects.length > 0) {
            const selected = intersects[0].object;

            // Log the selected model details
            console.log("Selected Model:", selected.name || "(Unnamed Object)", selected);

            // Reset previous selection
            if (this.selectedObject && this.originalMaterial) {
                (this.selectedObject as THREE.Mesh).material = this.originalMaterial;
            }

            // Store original material and apply highlight
            if (selected instanceof THREE.Mesh) {
                if (this.selectedObject !== selected) {  // Prevent reassigning the same object
                    if (this.selectedObject && this.originalMaterial) {
                        (this.selectedObject as THREE.Mesh).material = this.originalMaterial;
                    }
            
                    this.selectedObject = selected;
                    this.originalMaterial = selected.material;
                    selected.material = new THREE.MeshStandardMaterial({ color: this.highlightColor });
                }
            }
            
        }
    }

    // Function to collect selectable objects
    getSelectableObjects(): THREE.Object3D[] {
        const objects = GameObject.findObjectsOfType(THREE.Mesh);
        console.log("Selectable Objects Found:", objects);
        return objects;
    }
    
    
}

// import { Behaviour, GameObject, serializable } from "@needle-tools/engine";
// import * as THREE from "three";

// export class ModelSelector extends Behaviour {
    
//     @serializable(THREE.Color)
//     highlightColor: THREE.Color = new THREE.Color(0xff0000); // Red for selection

//     private raycaster = new THREE.Raycaster();
//     private pointer = new THREE.Vector2();
//     private selectedObject: THREE.Object3D | null = null;
//     private originalMaterial: THREE.Material | null = null;
//     private onPointerDownBound?: (event: PointerEvent) => void;
    

//     start() {
//         console.log("ModelSelector is active and attached to:", this.gameObject.name);
//     }
    
    

//     onPointerDown(event: PointerEvent) {
//         this.pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
//         this.pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

//         this.raycaster.setFromCamera(this.pointer, this.context.mainCamera);
//         const intersects = this.raycaster.intersectObjects(this.getSelectableObjects(), true);

//         if (intersects.length > 0) {
//             const selected = intersects[0].object;
//             console.log("Selected Model:", selected.name || "(Unnamed Object)", selected);

//             if (selected instanceof THREE.Mesh) {
//                 if (this.selectedObject !== selected) { 
//                     if (this.selectedObject && this.originalMaterial) {
//                         (this.selectedObject as THREE.Mesh).material = this.originalMaterial;
//                     }

//                     this.selectedObject = selected;
//                     this.originalMaterial = selected.material;
//                     selected.material = new THREE.MeshStandardMaterial({ color: this.highlightColor });
//                 }
//             }
//         }
//     }

//     getSelectableObjects(): THREE.Object3D[] {
//         const objects = GameObject.findObjectsOfType(THREE.Object3D);  // Get all objects
//         const meshes = objects.filter(obj => obj instanceof THREE.Mesh);  // Keep only meshes
//         console.log("Meshes Found:", meshes);
//         return meshes;
//     }
// }

