/* eslint-disable no-case-declarations */
window.addEventListener('load', function() {
  if(
    document.getElementById('editor') &&
    document.getElementById('toolbar')
  ) {
    let editor = document.getElementById('editor');
    let toolbar = document.getElementById('toolbar');

    toolbar.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        let element = e.target;
        let command = element.getAttribute('data-code');
        execCommand(command);
      });
    });

    editor.addEventListener('keydown', function(e) {
      if(editor.innerText.length === 0) {
        document.execCommand('formatBlock', false, 'p');        
      }

      if(e.keyCode === 13) {
        e.preventDefault();
        document.execCommand('insertParagraph');
      }
    });
  }

  if(document.getElementById('submitPost')) {
    let btn = document.getElementById('submitPost');
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      submitPost();
    });
  }
});

function execCommand(command) {
  switch(command) {
    case 'b':
      document.execCommand('bold');
      break;
    case 'i':
      document.execCommand('italic');
      break;
    case 'h1':
      document.execCommand('formatBlock', false, 'h1');
      break;
    case 'h2':
      document.execCommand('formatBlock', false, 'h2');
      break;
    case 'h3':
      document.execCommand('formatBlock', false, 'h3');
      break;
    case 'p':
      document.execCommand('formatBlock', false, 'p');
      break;
    case 'link':
      const url = prompt('URL:');
      document.execCommand('createLink', false, url);
      break;
    case 'unlink':
      document.execCommand('unlink', false, url);
      break;
  }
}

function submitPost() {
  let title = document.getElementById('title').value;
  let content = document.getElementById('editor').innerHTML;
  let status = document.getElementById('status').value;

  const post = {
    title,
    content,
    status,
  }

  const url = "/admin/post/create";

  window.fetch(
    url,
    {
      method: 'POST',
      body: JSON.stringify(post),
    }
  )
  .then(res => {
    return res.json();
  })
  .then(res => {
    console.log(res);
  });

  return false;
}
