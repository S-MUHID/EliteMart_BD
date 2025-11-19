// File Handler for Product Images and Videos
// This allows users to select files from their computer and convert them to data URLs

class FileHandler {
    constructor() {
        this.selectedFiles = {
            primaryImage: null,
            additionalImages: [],
            video: null
        };
    }

    // Handle primary image file selection
    handlePrimaryImageSelection(event) {
        const file = event.target.files[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            if (window.showToast) showToast('❌ Please select an image file', 'error'); else alert('❌ Please select an image file');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            this.selectedFiles.primaryImage = {
                name: file.name,
                dataUrl: e.target.result,
                size: file.size
            };
            
            // Update display
            document.getElementById('productImageFileName').textContent = `✓ ${file.name}`;
            document.getElementById('productImage').value = e.target.result;
            
            // Show preview
            this.showImagePreview('primaryImagePreview', e.target.result, file.name);
        };
        
        reader.readAsDataURL(file);
    }

    // Handle additional images file selection
    handleAdditionalImagesSelection(event) {
        const files = event.target.files;
        if (!files) return;

        this.selectedFiles.additionalImages = [];
        let validFiles = 0;

        for (let file of files) {
                if (!file.type.startsWith('image/')) {
                if (window.showToast) showToast(`⚠️ Skipped non-image file: ${file.name}`, 'warn'); else alert(`⚠️ Skipped non-image file: ${file.name}`);
                continue;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                this.selectedFiles.additionalImages.push({
                    name: file.name,
                    dataUrl: e.target.result,
                    size: file.size
                });

                // Update display
                const count = this.selectedFiles.additionalImages.length;
                document.getElementById('additionalImagesFileName').textContent = 
                    `✓ ${count} image(s) selected`;
                
                // Add preview
                this.addImagePreview('additionalImagesPreview', e.target.result, file.name);
            };
            
            reader.readAsDataURL(file);
            validFiles++;
        }
    }

    // Handle video file selection
    handleVideoSelection(event) {
        const file = event.target.files[0];
        if (!file) return;

        // Check if it's a video file
        if (!file.type.startsWith('video/') && !file.name.endsWith('.mp4') && !file.name.endsWith('.webm')) {
            if (window.showToast) showToast('❌ Please select a video file (MP4, WebM, etc.)', 'error'); else alert('❌ Please select a video file (MP4, WebM, etc.)');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            this.selectedFiles.video = {
                name: file.name,
                dataUrl: e.target.result,
                size: file.size
            };
            
            // Update display
            document.getElementById('productVideoFileName').textContent = 
                `✓ ${file.name} (${this.formatFileSize(file.size)})`;
            document.getElementById('productVideo').value = e.target.result;
            
            // Show video preview
            this.showVideoPreview('videoPreview', e.target.result);
        };
        
        reader.readAsDataURL(file);
    }

    // Show image preview
    showImagePreview(containerId, dataUrl, fileName) {
        let container = document.getElementById(containerId);
        if (!container) {
            const parent = document.querySelector('[data-preview-container]') || 
                          document.getElementById('addProductForm');
            container = document.createElement('div');
            container.id = containerId;
            container.style.cssText = 'margin-top: 15px; padding: 15px; background: #0f0f0f; border: 1px solid #333; border-radius: 8px;';
            parent.appendChild(container);
        }

        container.innerHTML = `
            <div style="font-size: 0.9rem; color: var(--gold); margin-bottom: 10px; font-weight: 600;">Preview: ${fileName}</div>
            <img src="${dataUrl}" alt="${fileName}" style="max-width: 150px; max-height: 150px; border-radius: 6px; border: 1px solid #333;">
        `;
    }

    // Add image preview (for multiple images)
    addImagePreview(containerId, dataUrl, fileName) {
        let container = document.getElementById(containerId);
        if (!container) {
            const parent = document.getElementById('addProductForm');
            container = document.createElement('div');
            container.id = containerId;
            container.style.cssText = 'margin-top: 15px; padding: 15px; background: #0f0f0f; border: 1px solid #333; border-radius: 8px;';
            parent.appendChild(container);
        }

        const imgDiv = document.createElement('div');
        imgDiv.style.cssText = 'display: inline-block; position: relative; margin-right: 10px; margin-bottom: 10px;';
        imgDiv.innerHTML = `
            <img src="${dataUrl}" alt="${fileName}" title="${fileName}" style="width: 100px; height: 100px; object-fit: cover; border-radius: 6px; border: 1px solid #333; display: block;">
            <div style="font-size: 0.75rem; color: #999; margin-top: 5px; text-align: center; max-width: 100px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${fileName}</div>
        `;
        container.appendChild(imgDiv);
    }

    // Show video preview
    showVideoPreview(containerId, dataUrl) {
        let container = document.getElementById(containerId);
        if (!container) {
            const parent = document.getElementById('addProductForm');
            container = document.createElement('div');
            container.id = containerId;
            container.style.cssText = 'margin-top: 15px; padding: 15px; background: #0f0f0f; border: 1px solid #333; border-radius: 8px;';
            parent.appendChild(container);
        }

        container.innerHTML = `
            <div style="font-size: 0.9rem; color: var(--gold); margin-bottom: 10px; font-weight: 600;">Video Preview</div>
            <video width="200" height="150" controls style="border-radius: 6px; border: 1px solid #333; background: #000;">
                <source src="${dataUrl}" type="video/mp4">
                Your browser does not support the video tag.
            </video>
        `;
    }

    // Format file size for display
    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    }

    // Get selected files
    getSelectedFiles() {
        return this.selectedFiles;
    }

    // Clear selected files
    clearSelectedFiles() {
        this.selectedFiles = {
            primaryImage: null,
            additionalImages: [],
            video: null
        };
        
        // Clear file inputs
        document.getElementById('productImageFile').value = '';
        document.getElementById('additionalImagesFiles').value = '';
        document.getElementById('productVideoFile').value = '';
        
        // Clear displays
        document.getElementById('productImageFileName').textContent = 'No file selected';
        document.getElementById('additionalImagesFileName').textContent = 'No files selected';
        document.getElementById('productVideoFileName').textContent = 'No file selected';
        
        // Clear previews
        ['primaryImagePreview', 'additionalImagesPreview', 'videoPreview'].forEach(id => {
            const elem = document.getElementById(id);
            if (elem) elem.remove();
        });
    }
}

// Create global instance
const fileHandler = new FileHandler();
