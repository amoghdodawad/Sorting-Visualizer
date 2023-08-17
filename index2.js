window.addEventListener('DOMContentLoaded',()=>{
    const arr = Array(60).fill().map(()=> Math.ceil(20*Math.random()));
    console.log(arr);
    const root = document.getElementById('root');
    let hasSwapped = false;
    let flag = 0;


    for(let i=0;i < arr.length; ++i){
        const div = document.createElement('div');
        div.classList.add('card');
        div.id = i;
        div.style.height = arr[i]+'rem';
        div.style.width = '0.5rem';
        root.appendChild(div);
    }

    let cards = document.getElementsByClassName('card');
    const bubbleSort = document.getElementById('bubble-sort');
    const mergeSort = document.getElementById('merge-sort');
    const quickSort = document.getElementById('quick-sort');
    const heapSort = document.getElementById('heap-sort');
    const delayHandler = document.getElementById('delay-handler');
    let ctr = 0;
    let size = arr.length - 1;
    let prev = -1;
    let level = 0;

    function disableInput(){
        bubbleSort.disabled = true;
        mergeSort.disabled = true;
        quickSort.disabled = true;
        heapSort.disabled = true;
        delayHandler.disabled = true;
    }

    function enableInput(){
        bubbleSort.disabled = false;
        mergeSort.disabled = false;
        quickSort.disabled = false;
        heapSort.disabled = false;
        delayHandler.disabled = false;
    }

    heapSort.addEventListener('click',()=>{
        console.log('Disabling');
        disableInput();
        console.log("Disabled");
        setTimeout(()=>{
            console.log('Enabling');
            enableInput();
            console.log('Enabled');
        },500)
    })
    
})