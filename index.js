window.addEventListener('DOMContentLoaded',()=>{
    console.log('Loaded');
    const arr = Array(60).fill().map(()=> Math.ceil(20*Math.random()));
    console.log(arr);
    
    let flag = 0;
    let ctr=0;
    let hasSwapped = true;
    let size = arr.length-1;
    let level = 0;
    let delay = 50;
    const screen = window.screen.width;
    if(screen < 750){
        arr.splice(0,30);
        size = arr.length-1;
    }

    const root = document.getElementById('root');
    for(let i=0;i < arr.length; ++i){
        const div = document.createElement('div');
        div.classList.add('card')
        div.style.height = arr[i]+'rem';
        root.appendChild(div);
    }

    let cards = document.getElementsByClassName('card');
    const bubbleSort = document.getElementById('bubble-sort');
    const selectionSort = document.getElementById('selection-sort');
    const insertionSort = document.getElementById('insertion-sort');
    const mergeSort = document.getElementById('merge-sort');
    const quickSort = document.getElementById('quick-sort');
    const heapSort = document.getElementById('heap-sort');
    const delayHandler = document.getElementById('delay-handler');

    function disableInput(){
        bubbleSort.disabled = true;
        selectionSort.disabled = true;
        insertionSort.disabled = true;
        mergeSort.disabled = true;
        quickSort.disabled = true;
        heapSort.disabled = true;
        delayHandler.disabled = true;
    }

    function enableInput(){
        bubbleSort.disabled = false;
        selectionSort.disabled = false;
        insertionSort.disabled = false;
        mergeSort.disabled = false;
        quickSort.disabled = false;
        heapSort.disabled = false;
        delayHandler.disabled = false;
    }
    
    delayHandler.addEventListener('change',(event)=>{
        console.log(event.target.value);
        delay = event.target.value;
    })

    bubbleSort.addEventListener('click',()=>{
        ctr = 0;
        disableInput();
        for(let i=0;i<arr.length-1;++i){
            hasSwapped = false;
            for(let j=0;j<arr.length-i-1;++j){
                if(arr[j] >= arr[j+1]){
                    hasSwapped = true;
                    let x = j
                    ++flag;
                    setTimeout(()=>{
                        cards[j].style.backgroundColor = cards[j+1].style.backgroundColor = 'rgb(32, 72, 250)';
                        cards[j].before(cards[j+1]);
                        setTimeout(()=>{
                            cards[j].style.backgroundColor = cards[j+1].style.backgroundColor = 'rgb(250, 32, 93)';
                            if(j == arr.length-i-2){
                                cards[size].style.backgroundColor = 'green'
                                --size;
                            }
                            // for(x=0;x<i;++x){
                            //     cards[arr.length-x-1].style.backgroundColor = 'green';
                            // }
                            --flag;
                            if(!flag){
                                for(let x = 0;x<arr.length;++x){
                                    if(cards[x].style.backgroundColor === 'green'){
                                        break;
                                    }
                                    cards[x].style.backgroundColor = 'green';
                                }
                            }
                        },Math.floor(delay/2))
                    },ctr*delay);
                    ++ctr;
                    let t = arr[j];
                    arr[j] = arr[j+1];
                    arr[j+1] = t;
                }
            }
            if(!hasSwapped){
                break;
            }
        }
        ++ctr;
        setTimeout(()=>{
            enableInput();
        },delay*ctr)
        console.log(arr);
    });

    selectionSort.addEventListener('click',()=>{
        disableInput();
        ctr = 0;
        function selectionSort(arr, n){
            for(let i=0;i<n-1;++i){
                let minIndex = i;
                for(let j=i+1;j<n;++j){
                    if(arr[j] < arr[minIndex]){
                        minIndex = j;
                    }
                }
                if(minIndex != i){
                    ++ctr;
                    const iHeight = arr[i];
                    const minHeight = arr[minIndex];
                    setTimeout(()=>{
                        cards[minIndex].style.backgroundColor = 'blue';
                        cards[i].style.backgroundColor = 'blue';
                        cards[minIndex].style.height = iHeight+'rem';
                        cards[i].style.height = minHeight+'rem';
                        setTimeout(()=>{
                            cards[minIndex].style.backgroundColor = 'rgb(250, 32, 93)';
                            cards[i].style.backgroundColor = 'green';
                            for(let x = i-1; x >= 0; --x){
                                if(cards[x].style.backgroundColor === 'green'){
                                    break;
                                }
                                cards[x].style.backgroundColor = 'green';
                            }
                        },Math.floor(delay/2))
                    },delay*ctr)
                    
                    const temp = arr[i];
                    arr[i] = arr[minIndex];
                    arr[minIndex] = temp;
                }
                
            }
        }
        selectionSort(arr,arr.length);
        console.log(arr);
        ++ctr;
        setTimeout(()=>{
            for(let i=arr.length-1; i >= 0; --i){
                if(cards[i].style.backgroundColor === 'green'){
                    break;
                }
                cards[i].style.backgroundColor = 'green';
            }
            enableInput();
        },delay*ctr)
    })

    insertionSort.addEventListener('click',()=>{
        disableInput();
        ctr = 0;
        function insertionSort(arr,n){
            for(let i=1; i < n; ++i){
                const key = arr[i];
                let j = i-1;
                while(j >= 0 && arr[j] > key){
                    ++ctr;
                    const tempJ = j
                    const jHeight = arr[tempJ];
                    setTimeout(()=>{
                        cards[tempJ+1].style.backgroundColor = 'blue';
                        cards[tempJ+1].style.height = jHeight+'rem';
                        setTimeout(()=>{
                            cards[tempJ+1].style.backgroundColor = 'rgb(250, 32, 93)';
                        },Math.floor(delay/2))
                    },delay*ctr)
                    arr[j+1] = arr[j];
                    j = j-1;
                }
                ++ctr;
                setTimeout(()=>{
                    cards[j+1].style.height = key+'rem';
                    // cards[j+1].style.backgroundColor = 'green';
                },delay*ctr);
                arr[j+1] = key;
            }
        }
        insertionSort(arr,arr.length);
        ++ctr;
        setTimeout(()=>{
            for(let i=0;i<arr.length;++i){
                cards[i].style.backgroundColor = 'green';
            }
            enableInput();
        },delay*ctr)
        console.log(arr);
    })
    
    mergeSort.addEventListener('click',()=>{
        ctr = 0;
        level = 0;
        disableInput();
        function merge_Arrays(arr,left,middle,right) {
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
                const x = i;
                const last = k-1;
                const height = arr[i];
                ++ctr;
                const col = level;
                setTimeout(()=>{
                    cards[x].style.backgroundColor = `rgb(0,${100+col*15},0)`;
                    cards[x].style.height = height+'rem';
                    cards[last].style.backgroundColor = 'blue';
                },delay*ctr)
            }
        }
    
        function merge_sort(arr, left, right) {
            if(left < right){
                let middle = Math.floor((left + right)/2);
                ++level;
                merge_sort(arr,left,middle);
                merge_sort(arr,middle+1,right);
                --level;
                merge_Arrays(arr,left,middle,right);
                if(level === 0){
                    ++ctr;
                    setTimeout(()=>{
                        cards[cards.length-1].style.backgroundColor = `rgb(0,100,0)`;
                        enableInput();
                    },delay*ctr);
                }
            }
        }
        merge_sort(arr,0,arr.length-1);
        console.log(arr);
    })


    quickSort.addEventListener('click',()=>{
        ctr = 0;
        level = 0;
        disableInput();
        function partition(arr,low,high){
            const pivot = arr[high];
            let i = low-1;
            for(let j=low; j <= high-1; ++j){
                if(arr[j] < pivot){
                    ++i;
                    ++ctr;
                    const iHeight = arr[i];
                    const jHeight = arr[j];
                    setTimeout(()=>{
                        cards[i].style.height = jHeight+'rem';
                        cards[j].style.height = iHeight+'rem';
                        cards[i].style.backgroundColor = 'blue';
                        cards[j].style.backgroundColor = 'blue';
                        setTimeout(()=>{
                            cards[i].style.backgroundColor = 'rgb(250, 32, 93)';
                            cards[j].style.backgroundColor = 'rgb(250, 32, 93)';
                        },Math.floor(delay/2))
                    },delay*ctr);

                    const t = arr[i];
                    arr[i] = arr[j];
                    arr[j] = t;
                    
                }
            }

            const plusOneHeight = arr[i+1];
            const highHeight = arr[high];
            ++ctr;
            setTimeout(()=>{
                cards[i+1].style.height = highHeight+'rem';
                cards[high].style.height = plusOneHeight+'rem';
                cards[i+1].style.backgroundColor = 'blue';
                cards[high].style.backgroundColor = 'blue';
                setTimeout(()=>{
                    cards[i+1].style.backgroundColor = 'rgb(250, 32, 93)';
                    cards[high].style.backgroundColor = 'rgb(250, 32, 93)';
                },Math.floor(delay/2))
            },delay*ctr);
            
            const t = arr[i+1];
            arr[i+1] = arr[high];
            arr[high] = t;
            
            return i+1;
        }

        function quickSort(arr,low,high){
            if(low < high){
                ++level;
                const partitionIndex = partition(arr,low,high);

                ++ctr;
                const k = level;
                setTimeout(()=>{
                    cards[partitionIndex].style.backgroundColor = `rgb(0,${70+k*20},0)`;
                },delay*ctr)

                quickSort(arr,low,partitionIndex-1);
                quickSort(arr,partitionIndex+1,high);

                ++ctr;
                setTimeout(()=>{
                    cards[partitionIndex].style.backgroundColor = 'rgb(250, 32, 93)';
                },delay*ctr);
                --level;
                if(level === 0){
                    ++ctr;
                    setTimeout(()=>{
                        enableInput();
                    },delay*ctr)
                }
            }
            
        }
        quickSort(arr,0,arr.length-1);
        console.log(arr);
    })

    heapSort.addEventListener('click',()=>{
        ctr = 0;
        arr.push(-1);
        disableInput();
        function heapify(arr, n , i){
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
                const largestHeight = arr[largest];
                const iHeight = arr[i];
                ++ctr;
                setTimeout(()=>{
                    cards[largest].style.height = iHeight+'rem';
                    cards[i].style.height = largestHeight+'rem';
                    cards[i].style.backgroundColor = 'blue';
                    cards[largest].style.backgroundColor = 'blue';
                    setTimeout(()=>{
                        cards[i].style.backgroundColor = 'rgb(250, 32, 93)';
                        cards[largest].style.backgroundColor = 'rgb(250, 32, 93)';
                    },Math.floor(delay/2))
                },delay*ctr)
                const temp = arr[i];
                arr[i] = arr[largest];
                arr[largest] = temp;
                heapify(arr,n,largest);
            }
        }
        function heapSort(arr, n){
            for(let i=n/2-1; i >= 0; --i){
                heapify(arr,n,i);
            }

            for(let i=n-1 ;i >= 0; --i){
                const zeroHeight = arr[0];
                const iHeight = arr[i];
                ++ctr;
                setTimeout(()=>{
                    cards[0].style.height = iHeight+'rem';
                    cards[i].style.height = zeroHeight+'rem';
                    cards[0].style.backgroundColor = 'blue';
                    cards[i].style.backgroundColor = 'blue';
                    setTimeout(()=>{
                        cards[0].style.backgroundColor = 'rgb(250, 32, 93)';
                        cards[i].style.backgroundColor = 'green';
                    },Math.floor(delay/5))
                },delay*ctr)
                const temp = arr[0];
                arr[0] = arr[i]; 
                arr[i] = temp;
                heapify(arr, i, 0);
                if(i === 0){
                    ++ctr;
                    setTimeout(()=>{
                        enableInput();
                    },delay*ctr)
                }
            }
        }
        for(let i=arr.length/2-1;i >= 0; --i){
            heapify(arr,arr.length-1,i);
        }
        heapSort(arr,arr.length-1);
        arr.pop();
        console.log(arr);
    })
})