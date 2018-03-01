//Functions that animate the page

function toggleVisible(sec_id, arrow_id) {
  if (sec_id.style.display == "none") {
    arrow_id.className   = "open_arrow";
    sec_id.style.display = "block";
  } else {
    arrow_id.className   = "closed_arrow";
    sec_id.style.display = "none";
  }
}
