window.onload = function (){
    var body = document.getElementById('nfc');
    var htmldata='<nav class="navbar navbar-light">';
    htmldata+='<div class="container-fluid py-lg-2 py-md-2 py-1 px-4">';
    htmldata+='<a class="navbar-brand text-white">NFC</a>';
    htmldata+='<div class="d-flex">';
    htmldata+='<img src="assets/nfc-logo.png" onclick="readTag()"  title="Click to Scan" height="25" width="25" alt="">';
    htmldata+='</div>';
    htmldata+='</div>';
    htmldata+='</nav>';
  
  
    htmldata+='<div class="d-flex justify-content-center pad-top">';
    htmldata+='<div class="row">';
    htmldata+='<div class="col-lg-12 col-xs-12 col-sm-12 col-md-12">';
    htmldata+='<div class="span">';
    htmldata+='<span class="">';
    htmldata+='<input class="swing" id="artist" type="text" placeholder="Enter message here..." /><label for="artist" class="text-white">Enter the details</label>';
    htmldata+='    </span>';
    htmldata+='    </div>';
    htmldata+='    <div class="text-center">';
    htmldata+='      <button class="btn btn-success" onclick="writeTag()">Write</button>';
    htmldata+='       <div class="mt-3">';
    htmldata+='        <label id="succ_result"></label>';
    htmldata+='      </div>';
    htmldata+='    </div>';
    htmldata+='  </div>';
    htmldata+='</div>';
    htmldata+='</div>';
    body.innerHTML = htmldata;
}

async function readTag() {
    document.getElementById('succ_result').innerHTML ="";
    if ("NDEFReader" in window) {
      const ndef = new NDEFReader();
      try {
        await ndef.scan();
        ndef.onreading = event => {
          const decoder = new TextDecoder();
          for (const record of event.message.records) {
            document.getElementById('succ_result').innerHTML ="The Scan Started Successfully!";
            var msg =decoder.decode(record.data);
            Swal.fire(
                'Message successfully read!',
                msg,
                'success'
              )
          }
        }
      } catch(error) {
        document.getElementById('succ_result').innerHTML =""
        Swal.fire(
            'Oops...',
            error,
            'error'
          )
      }
    } else {
        document.getElementById('succ_result').innerHTML =""
        Swal.fire(
            'Oops...',
            'Web NFC is not supported.',
            'error'
          )
    }
  }
  
  async function writeTag() {
    document.getElementById('succ_result').innerHTML =""
    var writeText = document.getElementById("artist").value;
    if (writeText){
        if ("NDEFReader" in window) {
            const ndef = new NDEFReader();
            try {
              var writeText = document.getElementById("artist").value;
              await ndef.write(writeText);
              Swal.fire(
                'Write!',
                'Message written successfully.',
                'success'
              )
            } catch(error) {
            Swal.fire(
                'Oops...',
                error,
                'error'
              )
            }
          } else {
              Swal.fire(
                'Oops...',
                'Web NFC is not supported.',
                'error'
              )
          }
      }
      else {
        Swal.fire(
            'Empty!',
            'Enter the value in the textbox.',
            'warning'
        )
    }
  }
