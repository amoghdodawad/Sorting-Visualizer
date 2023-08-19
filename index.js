window.addEventListener('DOMContentLoaded',()=>{
    let delay = 63;
    let arr = Array(60).fill().map(()=> Math.ceil(20*Math.random()));
    console.log(arr);

    const root = document.getElementById('root');
    const bubbleSort = document.getElementById('bubble-sort');
    const selectionSort = document.getElementById('selection-sort');
    const insertionSort = document.getElementById('insertion-sort');
    const mergeSort = document.getElementById('merge-sort');
    const quickSort = document.getElementById('quick-sort');
    const heapSort = document.getElementById('heap-sort');
    const delayHandler = document.getElementById('delay-handler');
    const delayDisplayer = document.getElementById('delay-displayer');
    const arraySizeHandler = document.getElementById('array-size-handler');
    const arraySizeDisplayer = document.getElementById('array-size-displayer');
    const generateNewArray = document.getElementById('generate-new-array');
    let cards = document.getElementsByClassName('card');

    const screen = window.screen.width;
    if(screen < 750){
        arr.splice(0,30);
        size = arr.length-1;
        arraySizeHandler.max = 30;
        arraySizeHandler.value = 30;
        arraySizeDisplayer.innerHTML = arraySizeHandler.max;
    }

    function generateCards(length){
        for(let i=0;i < length; ++i){
            const div = document.createElement('div');
            div.classList.add('card')
            div.style.height = arr[i]+'rem';
            root.appendChild(div);
        }
    }
    generateCards(arr.length);

    function disableInput(){
        bubbleSort.disabled = true;
        selectionSort.disabled = true;
        insertionSort.disabled = true;
        mergeSort.disabled = true;
        quickSort.disabled = true;
        heapSort.disabled = true;
        arraySizeHandler.disabled = true;
        generateNewArray.disabled = true;
    }

    function enableInput(){
        bubbleSort.disabled = false;
        selectionSort.disabled = false;
        insertionSort.disabled = false;
        mergeSort.disabled = false;
        quickSort.disabled = false;
        heapSort.disabled = false;
        arraySizeHandler.disabled = false;
        generateNewArray.disabled = false;
    }

    function changeAllCardsToRed(){
        for(let i=0;i<cards.length;++i){
            cards[i].style.backgroundColor = 'rgb(250, 32, 93)';
        }
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    
    delayHandler.addEventListener('input',(event)=>{
        delay = parseInt(event.target.value);
        delayDisplayer.innerHTML = delay + ' ms';
    })

    arraySizeHandler.addEventListener('input',(event)=>{
        arraySizeDisplayer.innerHTML = event.target.value;
        arr = Array(parseInt(event.target.value)).fill().map(()=> (Math.ceil(20*Math.random())));

        size = arr.length-1;
        root.innerHTML = '';
        
        generateCards(arr.length);
    })

    generateNewArray.addEventListener('click',()=>{
        arr = Array(arr.length).fill().map(()=> (Math.ceil(20*Math.random())));
        root.innerHTML = '';
        generateCards(arr.length);
    })

    /*
        The sorting algorithms are defined in the following order
            - Bubble sort
            - Selection sort
            - Insertion sort
            - Merge sort
            - Quick sort
            - Heap sort
    */

    bubbleSort.addEventListener('click',async ()=>{
        let hasSwapped = false;
        disableInput();
        changeAllCardsToRed();
        for(let i=0;i<arr.length-1;++i){
            hasSwapped = false;

            for(let j=0;j<arr.length-i-1;++j){
                if(arr[j] > arr[j+1]){

                    hasSwapped = true;

                    await sleep(delay);
                    cards[j].style.backgroundColor = cards[j+1].style.backgroundColor = 'rgb(32, 72, 250)';
                    cards[j].before(cards[j+1]);

                    await sleep(Math.floor(delay/2));
                    cards[j].style.backgroundColor = cards[j+1].style.backgroundColor = 'rgb(250, 32, 93)';
                    for(let x=0;x<i;++x){
                        cards[arr.length-x-1].style.backgroundColor = 'green';
                    }

                    const t = arr[j];
                    arr[j] = arr[j+1];
                    arr[j+1] = t;
                }
            }
            if(!hasSwapped){
                break;
            }
        }
        for(let i=0;i<cards.length;++i){
            cards[i].style.backgroundColor = 'green';
        }
        enableInput();
        console.log(arr);
    });

    selectionSort.addEventListener('click',async ()=>{
        disableInput();
        changeAllCardsToRed();

        async function selectionSort(arr, n){
            for(let i=0;i<n-1;++i){
                let minIndex = i;
                for(let j=i+1;j<n;++j){
                    if(arr[j] < arr[minIndex]){
                        minIndex = j;
                    }
                }
                if(minIndex != i){
                    await sleep(delay);

                    // Change the colour to blue;
                    cards[minIndex].style.backgroundColor = 'blue';
                    cards[i].style.backgroundColor = 'blue';

                    // Swap their heights
                    cards[minIndex].style.height = arr[i]+'rem';
                    cards[i].style.height = arr[minIndex]+'rem';

                    await sleep(Math.floor(delay/2));

                    // Change the colour back to red
                    cards[minIndex].style.backgroundColor = 'rgb(250, 32, 93)';

                    // Change the colour of the sorted element
                    // to green
                    cards[i].style.backgroundColor = 'green';

                    // Kind of a patch code
                    for(let x = i-1; x >= 0; --x){
                        if(cards[x].style.backgroundColor === 'green'){
                            break;
                        }
                        cards[x].style.backgroundColor = 'green';
                    }
                    const temp = arr[i];
                    arr[i] = arr[minIndex];
                    arr[minIndex] = temp;
                }
                
            }
        }
        await selectionSort(arr,arr.length);
        console.log(arr);

        // Once the array is sorted(on the DOM), colour 
        // all the leftover DOM elements to green.
        for(let i=arr.length-1; i >= 0; --i){
            if(cards[i].style.backgroundColor === 'green'){
                break;
            }
            cards[i].style.backgroundColor = 'green';
        }
        enableInput();
    })

    insertionSort.addEventListener('click',async ()=>{
        disableInput();
        changeAllCardsToRed();
        async function insertionSort(arr,n){
            for(let i=1; i < n; ++i){
                const key = arr[i];
                let j = i-1;

                while(j >= 0 && arr[j] > key){

                    await sleep(delay);
                    // Change the colour and update the DOM.
                    cards[j+1].style.backgroundColor = 'blue';
                    cards[j+1].style.height = arr[j]+'rem';

                    await sleep(Math.floor(delay/2));
                    cards[j+1].style.backgroundColor = 'green';

                    arr[j+1] = arr[j];
                    j = j-1;
                }

                await sleep(delay);
                cards[j+1].style.height = key+'rem';
                cards[j+1].style.backgroundColor = 'green';
                arr[j+1] = key;
            }
        }
        await insertionSort(arr,arr.length);
        enableInput();
        console.log(arr);
    })
    
    mergeSort.addEventListener('click',async ()=>{
        disableInput();
        changeAllCardsToRed();
        let recursionLevel = 0;
        async function merge_Arrays(arr,left,middle,right) {
            const n1 = middle-left+1;
            const n2 = right-middle;
            let left_array = Array(n1);
            let right_array = Array(n2);
            
            for(let i=0;i<n1;++i){
                left_array[i] = arr[left+i];
            }
            
            for(let i=0;i<n2;++i){
                right_array[i] = arr[middle+i+1];
            }
            let i=0,j=0,k=left;
            
            while(i < n1 && j < n2){
                if(left_array[i] < right_array[j]){
                    arr[k] = left_array[i++];
                } else {
                    arr[k] = right_array[j++];
                }
                ++k;
            }
    
            while(i < n1){
                arr[k] = left_array[i++];
                ++k;
            }
            while(j < n2){
                arr[k] = right_array[j++];
                ++k;
            }
            for(let i=left;i<k;++i){
                await sleep(delay);
                cards[i].style.backgroundColor = `rgb(0,${100+recursionLevel*20},0)`;
                cards[i].style.height = arr[i]+'rem';
                cards[k-1].style.backgroundColor = 'blue';
            }
        }
    
        async function merge_sort(arr, left, right) {
            if(left < right){
                ++recursionLevel;
                let middle = Math.floor((left + right)/2);
                await merge_sort(arr,left,middle);
                await merge_sort(arr,middle+1,right);
                await merge_Arrays(arr,left,middle,right);
                --recursionLevel;
            }
        }
        await merge_sort(arr,0,arr.length-1);
        cards[cards.length-1].style.backgroundColor = `rgb(0,100,0)`;
        enableInput();
        console.log(arr);
    })

    quickSort.addEventListener('click',async ()=>{
        disableInput();
        changeAllCardsToRed();
        let recursionLevel = 0;
        async function partition(arr,low,high){
            const pivot = arr[high];
            let i = low-1;
            for(let j=low; j <= high-1; ++j){
                if(arr[j] < pivot){
                    ++i;

                    await sleep(delay);
                    cards[i].style.height = arr[j]+'rem';
                    cards[j].style.height = arr[i]+'rem';
                    cards[i].style.backgroundColor = 'blue';
                    cards[j].style.backgroundColor = 'blue';

                    await sleep(Math.floor(delay/2));
                    cards[i].style.backgroundColor = 'rgb(250, 32, 93)';
                    cards[j].style.backgroundColor = 'rgb(250, 32, 93)';

                    const t = arr[i];
                    arr[i] = arr[j];
                    arr[j] = t;
                    
                }
            }

            await sleep(delay);
            cards[i+1].style.height = arr[high]+'rem';
            cards[high].style.height = arr[i+1]+'rem';
            cards[i+1].style.backgroundColor = 'blue';
            cards[high].style.backgroundColor = 'blue';

            await sleep(Math.floor(delay/2));
            cards[i+1].style.backgroundColor = 'rgb(250, 32, 93)';
            cards[high].style.backgroundColor = 'rgb(250, 32, 93)';
            
            const t = arr[i+1];
            arr[i+1] = arr[high];
            arr[high] = t;
            
            return i+1;
        }

        async function quickSort(arr,low,high){
            if(low < high){
                ++recursionLevel;
                const partitionIndex = await partition(arr,low,high);
                cards[partitionIndex].style.backgroundColor = `rgb(0,${70+recursionLevel*20},0)`;

                await quickSort(arr,low,partitionIndex-1);
                await quickSort(arr,partitionIndex+1,high);

                cards[partitionIndex].style.backgroundColor = 'rgb(250, 32, 93)';
                --recursionLevel;
            }  
        }
        await quickSort(arr,0,arr.length-1);
        
        for(let i=0;i<arr.length;++i){
            cards[i].style.backgroundColor = 'green';
        }
        enableInput();
        console.log(arr);
    })

    heapSort.addEventListener('click',async ()=>{
        arr.push(-1);
        disableInput();
        changeAllCardsToRed();
        async function heapify(arr, n , i){
            let largest = i;
            let leftChild = 2*i+1;
            let rightChild = 2*i+2;

            if(leftChild < n && arr[leftChild] > arr[largest]){
                largest = leftChild;
            }

            if(rightChild < n && arr[rightChild] > arr[largest]){
                largest = rightChild;
            }

            if(largest !== i){
                await sleep(delay);
                cards[largest].style.height = arr[i]+'rem';
                cards[i].style.height = arr[largest]+'rem';
                cards[i].style.backgroundColor = 'blue';
                cards[largest].style.backgroundColor = 'blue';

                await(sleep(Math.floor(delay/2)));
                cards[i].style.backgroundColor = 'rgb(250, 32, 93)';
                cards[largest].style.backgroundColor = 'rgb(250, 32, 93)';

                const temp = arr[i];
                arr[i] = arr[largest];
                arr[largest] = temp;
                await heapify(arr,n,largest);
            }
        }
        async function heapSort(arr, n){
            for(let i=n/2-1; i >= 0; --i){
                await heapify(arr,n,i);
            }

            for(let i=n-1 ;i >= 0; --i){
                await sleep(delay);
                cards[0].style.height = arr[i]+'rem';
                cards[i].style.height = arr[0]+'rem';
                cards[0].style.backgroundColor = 'blue';
                cards[i].style.backgroundColor = 'blue';

                await sleep(Math.floor(delay/2));
                cards[0].style.backgroundColor = 'rgb(250, 32, 93)';
                cards[i].style.backgroundColor = 'green';

                const temp = arr[0];
                arr[0] = arr[i]; 
                arr[i] = temp;

                await heapify(arr, i, 0);
                if(i === 0){
                    await sleep(delay);
                    enableInput();
                }
            }
        }
        await heapSort(arr,arr.length-1);
        arr.pop();
        console.log(arr);
    })
})