window.addEventListener('DOMContentLoaded',()=>{
    const arr = Array(80).fill().map(()=> Math.ceil(20*Math.random()));
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
    let ctr = 0;
    let size = arr.length - 1;
    const lastOf = Array(10);

    bubbleSort.addEventListener('click',()=>{
        for(let i=0;i<arr.length-1;++i){
            hasSwapped = false;
            for(let j=0;j<arr.length-i-1;++j){
                if(arr[j] > arr[j+1]){
                    hasSwapped = true;
                    let x = j
                    ++flag;
                    setTimeout(()=>{
                        cards[j].style.backgroundColor = cards[j+1].style.backgroundColor = 'red';
                        cards[j].before(cards[j+1]);
                        cards[j].id = j;
                        cards[j+1].id = j+1;
                        setTimeout(()=>{
                            cards[j].style.backgroundColor = cards[j+1].style.backgroundColor = 'blue';
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
})