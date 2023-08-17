window.addEventListener('DOMContentLoaded',()=>{
    const arr = Array(100).fill().map(()=> Math.ceil(20*Math.random()));
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
    const heapSort = document.getElementById('heap-sort')
    let ctr = 0;
    let size = arr.length - 1;
    let prev = -1;
    let level = 0;



    heapSort.addEventListener('click',()=>{
        ctr = 0;
        console.log('Heapsort');
        arr.push(-1);
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
                    },25)
                },50*ctr)
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
                    },5)
                },50*ctr)
                const temp = arr[0];
                arr[0] = arr[i]; 
                arr[i] = temp;
                heapify(arr, i, 0);
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