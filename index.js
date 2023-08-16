window.addEventListener('DOMContentLoaded',()=>{
    console.log('Loaded');
    const arr = Array(60).fill().map(()=> Math.ceil(20*Math.random()));
    console.log(arr);
    const root = document.getElementById('root');
    let flag = 0;
    let ctr=0;
    let hasSwapped = true;
    let size = arr.length-1;
    const screen = window.screen.width;
    if(screen < 750){
        arr.splice(0,30);
        size = arr.length-1;
    }

    for(let i=0;i < arr.length; ++i){
        const div = document.createElement('div');
        div.classList.add('card')
        div.style.height = arr[i]+'rem';
        root.appendChild(div);
    }

    let cards = document.getElementsByClassName('card');
    const bubbleSort = document.getElementById('bubble-sort');
    const mergeSort = document.getElementById('merge-sort');

    bubbleSort.addEventListener('click',()=>{
        ctr = 0;
        for(let i=0;i<arr.length-1;++i){
            hasSwapped = false;
            for(let j=0;j<arr.length-i-1;++j){
                if(arr[j] > arr[j+1]){
                    hasSwapped = true;
                    let x = j
                    ++flag;
                    setTimeout(()=>{
                        cards[j].style.backgroundColor = cards[j+1].style.backgroundColor = 'rgb(32, 72, 250)';
                        cards[j].before(cards[j+1]);
                        cards[j].id = j;
                        cards[j+1].id = j+1;
                        setTimeout(()=>{
                            cards[j].style.backgroundColor = cards[j+1].style.backgroundColor = 'rgb(250, 32, 93)';
                            if(j == arr.length-i-2){
                                cards[size].style.backgroundColor = 'green'
                                --size;
                            }
                            for(x=0;x<i;++x){
                                cards[arr.length-x-1].style.backgroundColor = 'green';
                            }
                            --flag;
                            if(!flag){
                                for(let x = 0;x<arr.length;++x){
                                    // if(cards[x].style.backgroundColor = 'green'){
                                    //     break;
                                    // }
                                    cards[x].style.backgroundColor = 'green';
                                }
                            }
                        },25)
                    },ctr*50);
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
        console.log(arr);
    });
    
    mergeSort.addEventListener('click',()=>{
        ctr = 0;
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
                setTimeout(()=>{
                    cards[x].style.backgroundColor = 'rgb(32, 72, 250)';
                    cards[x].style.height = height+'rem';
                    cards[last].style.backgroundColor = 'green';
                    setTimeout(()=>{
                        cards[x].style.backgroundColor = 'rgb(250, 32, 93)';
                    },25);
                    setTimeout(()=>{
                        cards[last].style.backgroundColor = 'rgb(250, 32, 93)';
                    },50*(k-i))
                },50*ctr)
            }
         }
    
         function merge_sort(arr, left, right) {
            if(left < right){
                let middle = Math.floor((left + right)/2);
                merge_sort(arr,left,middle);
                merge_sort(arr,middle+1,right);
                merge_Arrays(arr,left,middle,right);
            }
         }
         merge_sort(arr,0,arr.length-1);
        console.log(arr);
    })
})