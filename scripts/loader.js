let loaderHtml = "<div id='loader'><p><span>B</span><span>U</span><span>Y</span><span>-</span><span>E</span><span>Z</span></p></div>";

function loaderAnimation() {
  let loader = document.getElementById('loader').childNodes;
  let spans = loader[1].childNodes;
  let margin = 0;
  for (let i = 0; i < spans.length; i++) {
    spans[i].className = 'loaderText';
    if (i != 0) {

      // console.log(spans[i].previousSibling.offsetWidth);
      // console.log("==");
      margin += spans[i].previousSibling.offsetWidth;
      // console.log(margin)
      spans[i].style.marginLeft = margin + 'px';
    }

  }
}


export { loaderHtml, loaderAnimation };