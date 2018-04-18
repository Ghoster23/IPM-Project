function zoom(newImage) {
  document.getElementById("Zoom_Text").style.display = "none";
  document.getElementById("Zoom_Image").src = newImage;
  if (newImage == 'Storyboard - Saude.jpg' || newImage == 'Storyboard - Mensagens.jpg') {
    document.getElementById("Zoom_Image").style.transform = "rotate(180deg)";
  } else {
    document.getElementById("Zoom_Image").style.transform = "rotate(0deg)";
  }
}
