let order = 1;
let adding = false;

const error = document.querySelector('.error');
const message = 'Please add a description.';

const add_btn = document.querySelector('.add');
add_btn.addEventListener('click', () => {
  const target = document.querySelector('#requested');
  if (adding == false) {
    adding = true;
    target.appendChild(create_item());
  } else {
    error.innerHTML = message;
  }
});

const create_item = () => {
  const item = document.createElement('div');
  item.classList.add('item');
  item.setAttribute('id', 'item-' + order);
  item.setAttribute('draggable', true);
  item.addEventListener('dragstart', dragStart);
  item.addEventListener('dragend', dragEnd);

  const input = document.createElement('input');
  item.appendChild(input);

  const save_btn = document.createElement('button');
  save_btn.innerHTML = "Save";
  save_btn.addEventListener('click', onclick);
  item.appendChild(save_btn);

  return item;
};

const dragStart = (event) => {
  event.dataTransfer.setData("Text", event.target.id);
}
const dragEnd = (event) => {
  event.dataTransfer.clearData();
}

const onDrop = (event) => {
  const id = event.dataTransfer.getData("Text");
  const item = document.getElementById(id);
  event.target.appendChild(item);
  event.preventDefault();
}

const onDragover = (event) => {
  event.preventDefault();
}

const onclick = () => {
  error.innerHTML = "";
  const input = document.querySelector("input");
  if(input !== ""){
    const item = document.querySelector("#item-" + order)
    order += 1;
    item.innerHTML = input.value;
    adding = false;
  } else {
    error.innerHTML = message;
  }
}

document.querySelectorAll('.drop').forEach(element => {
  element.addEventListener('drop', onDrop);
  element.addEventListener('dragover', onDragover)
});