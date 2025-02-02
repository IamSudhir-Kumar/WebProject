// import { Behaviour } from "@needle-tools/engine";
// import * as THREE from "three";

// export class ColorChanger extends Behaviour {
//     private selectedObject: THREE.Mesh | null = null;

//     start() {
//         document.addEventListener("objectSelected", (event) => {
//             this.selectedObject = (event as CustomEvent).detail;
//             console.log(`✅ Selected for coloring: ${this.selectedObject?.name || "Unnamed Object"}`);
//         });

//         const colorPicker = document.getElementById("colorPicker") as HTMLInputElement;
//         if (colorPicker) {
//             colorPicker.addEventListener("input", (event) => this.changeColor(event));
//         }
//     }

//     private changeColor(event: Event) {
//         if (!this.selectedObject) {
//             console.warn("⚠️ No object selected! Please click on a part before changing its color.");
//             return;
//         }

//         const material = this.selectedObject.material as THREE.MeshStandardMaterial;
//         if (!material || !material.color) {
//             console.error("🚨 Selected object has no material or color property!");
//             return;
//         }

//         const input = event.target as HTMLInputElement;
//         const newColor = new THREE.Color(input.value);
//         material.color.set(newColor);

//         // Remove the outline effect once color is changed
//         material.emissive.setHex(0x000000);

//         console.log(`🎨 Changed color of ${this.selectedObject.name || "Unnamed Object"} to ${input.value}`);
//     }
// }
import { Behaviour } from "@needle-tools/engine";
import * as THREE from "three";

export class ColorChanger extends Behaviour {
    private selectedObject: THREE.Mesh | null = null;

    start() {
        document.addEventListener("objectSelected", (event) => {
            this.selectedObject = (event as CustomEvent).detail;
            console.log(`✅ Selected for coloring: ${this.selectedObject?.name || "Unnamed Object"}`);
        });

        const colorPicker = document.getElementById("colorPicker") as HTMLInputElement;
        if (colorPicker) {
            colorPicker.addEventListener("input", (event) => this.changeColor(event));
        }
    }

    private changeColor(event: Event) {
        if (!this.selectedObject) {
            console.warn("⚠️ No object selected! Please click on a part before changing its color.");
            return;
        }

        const material = this.selectedObject.material as THREE.MeshStandardMaterial;
        if (!material || !material.color) {
            console.error("🚨 Selected object has no material or color property!");
            return;
        }

        const input = event.target as HTMLInputElement;
        const newColor = new THREE.Color(input.value);

        // ✅ Only change the base color
        material.color.set(newColor);

        console.log(`🎨 Changed color of ${this.selectedObject.name || "Unnamed Object"} to ${input.value}`);
    }
}
