window.addEventListener('load', function() {
  if(
    document.getElementById('editor') &&
    document.getElementById('toolbar')
  ) {
    let editor = document.getElementById('editor');
    let toolbar = document.getElementById('toolbar');

    toolbar.querySelectorAll('button').forEach(btn => {
      console.log(btn);
      
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        let element = e.target;
        let command = element.getAttribute('data-code');
        execCommand(command);
      });
    });
  }
});

function execCommand(command) {
  switch(command) {
    case 'b':
      document.execCommand('bold');
      break;
  }
}
