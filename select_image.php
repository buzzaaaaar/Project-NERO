<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Browse Product Pictures</title>
</head>
<body>
    <h2>Browse Product Pictures</h2>

    <?php
    $imagesDir = "uploads/";
    $images = glob($imagesDir . "*.{jpg,jpeg,png,gif}", GLOB_BRACE);
    ?>

    <form>
        <label for="selected_image">Select Image:</label>
        <select name="selected_image" id="selected_image" onchange="displayImage()">
            <option value="" selected disabled>Select an image</option>
            <?php
            foreach ($images as $image) {
                $imageName = basename($image);
                echo "<option value='$image'>$imageName</option>";
            }
            ?>
        </select>

        <br>

        <img id="displayed_image" src="" alt="Selected Image" style="max-width: 400px; max-height: 400px;">

        <script>
            function displayImage() {
                var selectedImage = document.getElementById("selected_image").value;
                var displayedImage = document.getElementById("displayed_image");

                if (selectedImage) {
                    displayedImage.src = selectedImage;
                } else {
                    displayedImage.src = ""; // Clear the displayed image if no selection
                }
            }
        </script>
    </form>
</body>
</html>
