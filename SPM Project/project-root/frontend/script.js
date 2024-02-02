document.addEventListener('DOMContentLoaded', function() {
    const uploadForm = document.getElementById('uploadForm');
    const uploadInput = document.getElementById('uploadInput');
    const imageContainer = document.getElementById('imageContainer');
    const uploadedImage = document.getElementById('uploadedImage');
    const analysisResult = document.getElementById('analysisResult');

    uploadForm.addEventListener('submit', function(event) {
        event.preventDefault();
        analyzeImage();
    });

    function analyzeImage() {
        const file = uploadInput.files[0];
        if (!file) {
            alert('Please select an image file.');
            return;
        }

        const formData = new FormData();
        formData.append('image', file);

        fetch('/analyze', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            displayAnalysisResult(data.result);
        })
        .catch(error => {
            console.error('Error analyzing image:', error);
            alert('Error analyzing image. Please try again.');
        });
    }

    function displayAnalysisResult(result) {
        uploadedImage.src = URL.createObjectURL(uploadInput.files[0]);
        imageContainer.style.display = 'flex';
        analysisResult.textContent = 'Action detected: ' + result;
    }
});
