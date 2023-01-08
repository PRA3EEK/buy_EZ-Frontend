document.getElementById('password').onfocus = function ()
{
  document.getElementById('warnings').style.display = 'block';
}

document.getElementById('password').onblur = function ()
{
  document.getElementById('warnings').style.display = 'none';
}

function check()
{
  var text = document.getElementById('password').value;


   var uppercase = false;
   var lowercase = false;
   var special = false;
   var numeric = false;
   var greaterthan8 = false;

   for(let i=0; i<text.length; i++)
   {
      if(text.length>=8)
      {
          greaterthan8 = true;
      }
      if(text[i]>="A" && text[i]<="Z")
      {
          uppercase = true;
      }else if(text[i]>="a" && text[i]<="z")
      {
          lowercase = true;
      }else if(text[i]>="0" && text[i]<="9")
      {
          numeric = true;
      }else{
          special = true;
      }
   }
   
    if(lowercase)
    {
      document.getElementById('low').childNodes[0].src='correct.png';
    }else{
      document.getElementById('low').childNodes[0].src='incorrect.png';
    }

    if(uppercase)
    {
      document.getElementById('upp').childNodes[0].src='correct.png';
    }else{
      document.getElementById('upp').childNodes[0].src='incorrect.png';
    }

    if(greaterthan8)
    {
      document.getElementById('len').childNodes[0].src='correct.png';
    }else{
      document.getElementById('len').childNodes[0].src='incorrect.png';
    }

    if(special)
    {
      document.getElementById('spe').childNodes[0].src='correct.png';
    }else{
      document.getElementById('spe').childNodes[0].src='incorrect.png';
    }

    if(numeric)
    {
      document.getElementById('num').childNodes[0].src='correct.png';
    }else{
      document.getElementById('num').childNodes[0].src='incorrect.png';
    }

}