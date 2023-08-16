window.addEventListener('DOMContentLoaded',()=>{
    const arr = Array(85).fill().map(()=>Math.ceil(Math.random()*20));
    console.log(arr);
    const root = document.getElementById('root');
    const mergeSort = document.getElementById('merge-sort');
    let ctr = 0;

    for(let i=0;i < arr.length; ++i){
        // const node = document.createTextNode(' ' + arr[i] + ' ');
        const div = document.createElement('div');
        div.classList.add('card');
        div.id = i;
        div.style.height = arr[i]+'rem';
        div.style.width = '0.5rem';
        // div.appendChild(node);
        root.appendChild(div);
    }

    const cards = document.getElementsByClassName('card');

    mergeSort.addEventListener('click',()=>{
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
                    cards[x].style.backgroundColor = 'red';
                    cards[x].style.height = height+'rem';
                    cards[last].style.backgroundColor = 'green';
                    setTimeout(()=>{
                        cards[x].style.backgroundColor = 'blue';
                    },25);
                    setTimeout(()=>{
                        cards[last].style.backgroundColor = 'blue';
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