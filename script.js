const pages=[
['dashboard','Dashboard'],['intro','Introduction to DSA'],['complexity','Complexity Analysis'],['arrays','Arrays'],['linked','Linked Lists'],['stack','Stack'],['queue','Queue'],['trees','Trees'],['graphs','Graphs'],['searching','Searching'],['sorting','Sorting'],['recursion','Recursion'],['lab','Programming Lab'],['visualization','Visualization Lab'],['practice','Practice Zone'],['cheatsheet','DSA Cheat Sheet'],['student','Student Corner'],['about','About']
];
const corePages=pages.slice(1,17).map(x=>x[0]);
const snippets={
arrays:`#include <stdio.h>
int main(void){
    int a[5]={10,20,30,40,50};
    for(int i=0;i<5;i++) printf("%d ",a[i]);
    return 0;
}`,
linked:`#include <stdio.h>
#include <stdlib.h>
typedef struct Node{int data;struct Node* next;}Node;
int main(void){
    Node* head=malloc(sizeof(Node));
    head->data=10; head->next=NULL;
    printf("%d",head->data);
    free(head); return 0;
}`,
stack:`#include <stdio.h>
#define MAX 5
int stack[MAX],top=-1;
void push(int x){if(top==MAX-1) printf("Overflow\n"); else stack[++top]=x;}
int pop(void){if(top==-1){printf("Underflow\n");return -1;}return stack[top--];}
int main(void){push(10);push(20);printf("%d\n",pop());printf("%d",stack[top]);return 0;}`,
queue:`#include <stdio.h>
#define MAX 5
int q[MAX],front=0,rear=-1;
void enqueue(int x){if(rear==MAX-1) printf("Overflow\n"); else q[++rear]=x;}
int dequeue(void){if(front>rear){printf("Underflow\n");return -1;}return q[front++];}
int main(void){enqueue(10);enqueue(20);printf("%d\n",dequeue());printf("%d",q[front]);return 0;}`,
searching:`#include <stdio.h>
int binarySearch(int a[],int n,int key){int l=0,r=n-1;while(l<=r){int m=l+(r-l)/2;if(a[m]==key)return m;if(a[m]<key)l=m+1;else r=m-1;}return -1;}
int main(void){int a[]={10,20,30,40,50};printf("Index: %d",binarySearch(a,5,40));return 0;}`,
sorting:`#include <stdio.h>
void bubbleSort(int a[],int n){for(int i=0;i<n-1;i++)for(int j=0;j<n-i-1;j++)if(a[j]>a[j+1]){int t=a[j];a[j]=a[j+1];a[j+1]=t;}}
int main(void){int a[]={42,18,35,9,27,14};bubbleSort(a,6);for(int i=0;i<6;i++)printf("%d ",a[i]);return 0;}`,
recursion:`#include <stdio.h>
int factorial(int n){if(n<=1)return 1;return n*factorial(n-1);}
int main(void){printf("%d",factorial(5));return 0;}`
};
const reviews=[{name:'Student A',stars:5,text:'The visual explanations make DSA concepts easy to follow.'},{name:'Student B',stars:5,text:'Practice questions and complexity tables are very useful for revision.'},{name:'Student C',stars:4,text:'Animations help connect algorithms with actual operations.'}];
function esc(s){return String(s).replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]))}
function nav(){const n=document.querySelector('#navMenu');pages.forEach((p,i)=>{if(i===0||i===13||i===16) n.insertAdjacentHTML('beforeend',`<div class="menu-section">${i===0?'Course':i===13?'Labs & Practice':'Resources'}</div>`);n.insertAdjacentHTML('beforeend',`<button class="nav-btn" data-page="${p[0]}"><span class="nav-num">${i+1}</span>${p[1]}</button>`)});}
function progress(){let done=JSON.parse(localStorage.getItem('dsaDone')||'[]');let pct=Math.round(done.filter(x=>corePages.includes(x)).length/corePages.length*100);let bar=document.querySelector('#sideProgressBar'),txt=document.querySelector('#sideProgressText');if(bar)bar.style.width=pct+'%';if(txt)txt.textContent=pct+'%';return {done,pct}}
function initVisitorCounter(){let key='dsaVisitorCountLocal';let count=parseInt(localStorage.getItem(key)||'0',10);if(!sessionStorage.getItem('dsaVisitedThisSession')){count++;localStorage.setItem(key,String(count));sessionStorage.setItem('dsaVisitedThisSession','1')}let el=document.querySelector('#visitorCount');if(el)el.textContent=count.toLocaleString();let note=document.querySelector('#visitorNote');if(note)note.textContent='Unique visits recorded on this browser';}
function certificateHtml(){let {pct}=progress();if(pct<100)return `<div class=\"certificate-panel\"><h3>Certificate of Completion</h3><p>Complete all ${corePages.length} course topics to unlock your certificate.</p><div class=\"progress-track\" style=\"background:#dddff0;height:10px\"><div style=\"background:#6d4aff;width:${pct}%\"></div></div><p><b>${pct}% completed</b></p></div>`;return `<div class=\"certificate-panel\"><h3>🎓 Course Completed!</h3><p class=\"completion-good\">Congratulations! You have successfully completed all ${corePages.length} DSA learning modules.</p><div class=\"certificate-actions\"><button class=\"primary-btn\" onclick=\"openCertificate()\">Generate Certificate</button></div><div id=\"certificateArea\"></div></div>`}
window.openCertificate=()=>{let name=prompt('Enter your full name for the certificate:','Student');if(!name||!name.trim())return;let date=new Date().toLocaleDateString('en-IN',{day:'2-digit',month:'long',year:'numeric'});let area=document.querySelector('#certificateArea');area.innerHTML=`<div class=\"certificate-print\"><div class=\"certificate-preview\"><small>DSA LEARNING HUB</small><h2>Certificate of Completion</h2><div>This certificate is proudly presented to</div><div class=\"cert-name\">${esc(name.trim())}</div><div class=\"cert-line\"></div><p>for successfully completing the <b>Data Structures & Algorithms</b> course, including concepts, C programming, visualization, searching, sorting and practice.</p><p><b>Course Completion: 100%</b></p><small>Issued on ${date}</small><div style=\"margin-top:45px;display:flex;justify-content:space-around;gap:30px\"><span>________________<br>Course Instructor</span><span>________________<br>DSA Learning Hub</span></div></div><div style=\"text-align:center;margin-top:12px\"><button class=\"primary-btn\" onclick=\"window.print()\">Print / Save as PDF</button></div></div>`};
function markBtn(id){let {done}=progress();return `<div class="complete-row"><button class="primary-btn complete-btn ${done.includes(id)?'done':''}" onclick="toggleComplete('${id}')">${done.includes(id)?'✓ Topic Completed':'Mark Topic Complete'}</button></div>`}
window.toggleComplete=id=>{let a=JSON.parse(localStorage.getItem('dsaDone')||'[]');a=a.includes(id)?a.filter(x=>x!==id):[...a,id];localStorage.setItem('dsaDone',JSON.stringify(a));render(id)};
function codeCard(code,label='C Example'){return `<div class="code-card"><div class="code-head"><b>${label}</b><span>Source Code</span></div><pre class="code">${esc(code)}</pre></div>`}
function pageIntro(title,desc){return `<div class="page-intro"><h2>${title}</h2><p>${desc}</p></div>`}
function reviewsHtml(){return reviews.concat(JSON.parse(localStorage.getItem('dsaReviews')||'[]')).map(r=>`<div class="review"><b>${esc(r.name)}</b> <span class="stars">${'★'.repeat(r.stars)}</span><p>${esc(r.text)}</p></div>`).join('')}
function renderDashboard(){let t=document.querySelector('#dashboard-template').content.cloneNode(true);content.replaceChildren(t);let {done,pct}=progress();document.querySelector('#dashProgress').textContent=pct+'%';document.querySelector('#topicsDone').textContent=`${done.filter(x=>corePages.includes(x)).length} / ${corePages.length}`;document.querySelector('#reviewCount').textContent=reviews.length+JSON.parse(localStorage.getItem('dsaReviews')||'[]').length;document.querySelector('#dashboardReviews').innerHTML=reviewsHtml();document.querySelector('#roadmap').innerHTML=pages.slice(1,13).map((p,i)=>`<div class="roadmap-item" data-page="${p[0]}"><span class="chip">Step ${i+1}</span><b>${p[1]}</b><small>${done.includes(p[0])?'✓ Completed':'Explore concepts & examples'}</small></div>`).join('');document.querySelector('#content').insertAdjacentHTML('beforeend',certificateHtml());initVisitorCounter()}
function intro(){return pageIntro('Introduction to Data Structures & Algorithms','Understand the basic ideas that help computers store, organize, process and retrieve information efficiently.')+`<div class="topic-grid">
<article class="topic-card"><h3>What is Data?</h3><p>Data is a collection of raw facts, values, symbols or observations that can be processed to produce meaningful information. Examples include marks, names, images, sensor readings and transaction records.</p></article>
<article class="topic-card"><h3>What is a Data Structure?</h3><p>A data structure is a systematic way of organizing and storing data so that operations such as access, insertion, deletion, searching and updating can be performed efficiently.</p></article>
<article class="topic-card"><h3>What is an Algorithm?</h3><p>An algorithm is a finite, ordered sequence of unambiguous steps designed to solve a problem or perform a computation. A good algorithm should be correct, finite, clear and efficient.</p></article>
<article class="topic-card"><h3>Need for DSA</h3><ul><li>Efficient use of memory and processor time</li><li>Scalable software design</li><li>Faster searching and sorting</li><li>Better problem-solving and coding skills</li><li>Foundation for databases, AI, operating systems and networks</li></ul></article>
<article class="topic-card"><h3>Characteristics of a Good Algorithm</h3><ul><li><b>Input:</b> zero or more inputs</li><li><b>Output:</b> at least one result</li><li><b>Definiteness:</b> every step is clear</li><li><b>Finiteness:</b> terminates after finite steps</li><li><b>Effectiveness:</b> operations are feasible</li></ul></article>
<article class="topic-card"><h3>Real-world Applications</h3><p>Arrays power tables and images, queues manage requests, stacks support undo and function calls, trees index databases and file systems, and graphs represent roads, social networks and communication systems.</p></article></div>
<div class="section-head"><div><span>Diagram</span><h3>Classification of Data Structures</h3></div></div>
<div class="diagram classification"><div class="class-top"><span class="flow-box">Data Structures</span></div><div class="class-branch"><div class="class-box"><b>Primitive</b><div class="class-sub"><span>int</span><span>char</span><span>float</span><span>pointer</span></div></div><div class="class-box"><b>Non-Primitive</b><div class="class-sub"><span>Linear: Array, List, Stack, Queue</span><span>Non-Linear: Tree, Graph</span><span>Static</span><span>Dynamic</span></div></div></div></div>${markBtn('intro')}`}
function complexity(){return pageIntro('Complexity Analysis','Measure how an algorithm’s running time and memory requirements grow as input size increases.')+`<div class="topic-grid"><article class="topic-card"><h3>Time Complexity</h3><p>Time complexity estimates the number of elementary operations an algorithm performs as a function of input size <b>n</b>. It is hardware-independent and focuses on growth rate.</p></article><article class="topic-card"><h3>Space Complexity</h3><p>Space complexity measures total memory used, including input space and auxiliary space. In-place algorithms generally use O(1) auxiliary memory.</p></article><article class="topic-card"><h3>Best, Average & Worst Case</h3><p><b>Best case</b> is minimum work, <b>average case</b> is expected work over typical inputs, and <b>worst case</b> is maximum work for any input of size n.</p></article><article class="topic-card"><h3>Asymptotic Notations</h3><p><b>O(g(n))</b> gives an asymptotic upper bound, <b>Ω(g(n))</b> a lower bound, and <b>Θ(g(n))</b> a tight bound.</p><div class="flow"><span class="flow-box">O → Upper</span><span class="flow-box">Ω → Lower</span><span class="flow-box">Θ → Tight</span></div></article></div>
<div class="section-head"><div><span>Comparison</span><h3>Common Complexity Classes</h3></div></div><div class="panel"><table class="complexity-table"><tr><th>Complexity</th><th>Name</th><th>Typical Example</th><th>Growth</th></tr><tr><td class="good">O(1)</td><td>Constant</td><td>Array index access</td><td>Excellent</td></tr><tr><td class="good">O(log n)</td><td>Logarithmic</td><td>Binary search</td><td>Very good</td></tr><tr><td>O(n)</td><td>Linear</td><td>Linear search</td><td>Good</td></tr><tr><td>O(n log n)</td><td>Linearithmic</td><td>Merge sort</td><td>Efficient sorting</td></tr><tr><td class="warn">O(n²)</td><td>Quadratic</td><td>Bubble sort</td><td>Slow for large n</td></tr><tr><td class="bad">O(2ⁿ)</td><td>Exponential</td><td>Naive recursive subsets</td><td>Very slow</td></tr></table></div>
<div class="panel"><h3>Interactive Growth Example</h3><div class="controls"><input id="nInput" type="number" value="10" min="1" max="100000"><button class="primary-btn" onclick="calcGrowth()">Compare</button></div><div id="growthResult" class="result-box">Enter n and compare estimated operation counts.</div></div>${markBtn('complexity')}`}
window.calcGrowth=()=>{let n=Math.max(1,+document.querySelector('#nInput').value);document.querySelector('#growthResult').innerHTML=`For n = <b>${n}</b>: O(1) ≈ 1, O(log n) ≈ ${Math.ceil(Math.log2(n))}, O(n) = ${n.toLocaleString()}, O(n log n) ≈ ${Math.ceil(n*Math.log2(n)).toLocaleString()}, O(n²) = ${(n*n).toLocaleString()}.`}
function arrays(){return pageIntro('Arrays','An array stores elements of the same type in contiguous memory locations, enabling fast indexed access.')+`<div class="topic-grid"><article class="topic-card"><h3>Definition & Memory Representation</h3><p>If the base address is B and each element occupies w bytes, the address of A[i] is <b>B + i × w</b>.</p><div class="diagram"><div class="array-row">${[10,20,30,40,50].map((x,i)=>`<div class="cell">${x}<small>[${i}]</small></div>`).join('')}</div></div></article><article class="topic-card"><h3>Core Operations</h3><ul><li>Traversal — O(n)</li><li>Access by index — O(1)</li><li>Insertion at end — O(1) amortized for dynamic array</li><li>Insertion/deletion in middle — O(n)</li><li>Linear search — O(n)</li><li>Binary search on sorted array — O(log n)</li></ul></article><article class="topic-card"><h3>Advantages</h3><ul><li>Simple representation</li><li>Constant-time random access</li><li>Cache-friendly contiguous memory</li><li>Useful for matrices, tables and lookup data</li></ul></article><article class="topic-card"><h3>Limitations</h3><ul><li>Fixed size for static arrays</li><li>Costly middle insertion/deletion</li><li>Requires contiguous memory</li><li>Stores homogeneous elements</li></ul></article></div>${codeCard(snippets.arrays)}<div class="panel"><h3>Practice Problems</h3><p>1. Find the second largest element. &nbsp; 2. Reverse an array in-place. &nbsp; 3. Remove duplicates from a sorted array. &nbsp; 4. Rotate an array by k positions.</p></div>${markBtn('arrays')}`}
function linked(){return pageIntro('Linked Lists','A linked list stores data in dynamically allocated nodes connected through pointers. Use the visualizers below to observe how links change during insertion and deletion in Singly, Doubly and Circular Linked Lists.')+`<div class="topic-grid"><article class="topic-card"><h3>Singly Linked List</h3><p>Each node stores <b>data</b> and one <b>next</b> pointer. The last node points to NULL.</p></article><article class="topic-card"><h3>Doubly Linked List</h3><p>Each node stores <b>prev</b>, <b>data</b> and <b>next</b>, so traversal is possible in both directions.</p></article><article class="topic-card"><h3>Circular Linked List</h3><p>The last node points back to the first node instead of NULL, forming a circular chain.</p></article><article class="topic-card"><h3>Operations Visualized</h3><p>For all three types: insertion at beginning, end and position; deletion at beginning, end and position. Position numbering starts from 1.</p></article></div>
${linkedVizPanel('sll','Singly Linked List')}${linkedVizPanel('dll','Doubly Linked List')}${linkedVizPanel('cll','Circular Linked List')}
<div class="panel"><h3>Singly Linked List — Complete C Program</h3>${codeCard(sllCode,'C Program: Create, Insert, Delete, Search, Display')}</div><div class="panel"><h3>Doubly Linked List — Complete C Program</h3>${codeCard(dllCode,'C Program: Insert, Delete, Forward/Backward Display')}</div><div class="panel"><h3>Circular Linked List — Complete C Program</h3>${codeCard(cllCode,'C Program: Insert, Delete, Display')}</div>${markBtn('linked')}`}
function linkedVizPanel(type,title){return `<div class="panel ll-viz-panel"><h3>${title} — Operation Visualization</h3><p>Choose an operation and observe which pointer/link changes. Use a value for insertion and a 1-based position for position operations.</p><div class="controls"><input id="${type}Value" type="number" value="25" aria-label="Value"><input id="${type}Pos" type="number" value="2" min="1" aria-label="Position"><button class="primary-btn" onclick="llOperate('${type}','insertBegin')">Insert Beginning</button><button class="primary-btn" onclick="llOperate('${type}','insertEnd')">Insert End</button><button class="primary-btn" onclick="llOperate('${type}','insertPos')">Insert at Position</button><button class="danger-btn" onclick="llOperate('${type}','deleteBegin')">Delete Beginning</button><button class="danger-btn" onclick="llOperate('${type}','deleteEnd')">Delete End</button><button class="danger-btn" onclick="llOperate('${type}','deletePos')">Delete at Position</button><button class="ghost-btn" onclick="llReset('${type}')">Reset</button></div><div class="ll-legend"><span><b>Blue outline</b> = active node</span><span><b>Dashed link</b> = pointer being changed</span></div><div class="diagram ll-operation-stage" id="${type}Viz"></div><div id="${type}Status" class="result-box">Ready. Select an operation.</div></div>`}

const sllCode=`#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int data;
    struct Node *next;
} Node;

Node *head = NULL;

void insertEnd(int x) {
    Node *n = malloc(sizeof(Node));
    n->data = x;
    n->next = NULL;
    if (head == NULL) {
        head = n;
        return;
    }
    Node *p = head;
    while (p->next != NULL) p = p->next;
    p->next = n;
}

void insertBeginning(int x) {
    Node *n = malloc(sizeof(Node));
    n->data = x;
    n->next = head;
    head = n;
}

void deleteValue(int x) {
    Node *p = head;
    Node *prev = NULL;
    if (p == NULL) return;
    if (p->data == x) {
        head = p->next;
        free(p);
        return;
    }
    while (p != NULL && p->data != x) {
        prev = p;
        p = p->next;
    }
    if (p != NULL) {
        prev->next = p->next;
        free(p);
    }
}

int search(int x) {
    Node *p = head;
    int pos = 1;
    while (p != NULL) {
        if (p->data == x) return pos;
        p = p->next;
        pos++;
    }
    return -1;
}

void display(void) {
    Node *p = head;
    while (p != NULL) {
        printf("%d -> ", p->data);
        p = p->next;
    }
    printf("NULL
");
}

int main(void) {
    insertEnd(10);
    insertEnd(20);
    insertBeginning(5);
    display();
    deleteValue(10);
    display();
    printf("Position of 20: %d
", search(20));
    return 0;
}`;
const dllCode=`#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int data;
    struct Node *prev;
    struct Node *next;
} Node;

Node *head = NULL;

void insertEnd(int x) {
    Node *n = malloc(sizeof(Node));
    n->data = x;
    n->prev = NULL;
    n->next = NULL;
    if (head == NULL) { head = n; return; }
    Node *p = head;
    while (p->next != NULL) p = p->next;
    p->next = n;
    n->prev = p;
}

void insertBeginning(int x) {
    Node *n = malloc(sizeof(Node));
    n->data = x;
    n->prev = NULL;
    n->next = head;
    if (head != NULL) head->prev = n;
    head = n;
}

void deleteValue(int x) {
    Node *p = head;
    while (p != NULL && p->data != x) p = p->next;
    if (p == NULL) return;
    if (p->prev != NULL) p->prev->next = p->next;
    else head = p->next;
    if (p->next != NULL) p->next->prev = p->prev;
    free(p);
}

void displayForward(void) {
    for (Node *p = head; p != NULL; p = p->next)
        printf("%d <-> ", p->data);
    printf("NULL
");
}

void displayBackward(void) {
    if (head == NULL) return;
    Node *p = head;
    while (p->next != NULL) p = p->next;
    for (; p != NULL; p = p->prev)
        printf("%d <-> ", p->data);
    printf("NULL
");
}

int main(void) {
    insertEnd(10);
    insertEnd(20);
    insertBeginning(5);
    displayForward();
    displayBackward();
    deleteValue(10);
    displayForward();
    return 0;
}`;
const cllCode=`#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int data;
    struct Node *next;
} Node;

Node *head = NULL;

void insertEnd(int x) {
    Node *n = malloc(sizeof(Node));
    n->data = x;
    if (head == NULL) { head = n; n->next = head; return; }
    Node *p = head;
    while (p->next != head) p = p->next;
    p->next = n;
    n->next = head;
}

void insertBeginning(int x) {
    Node *n = malloc(sizeof(Node));
    n->data = x;
    if (head == NULL) { head = n; n->next = head; return; }
    Node *p = head;
    while (p->next != head) p = p->next;
    n->next = head;
    p->next = n;
    head = n;
}

void deleteValue(int x) {
    if (head == NULL) return;
    Node *p = head;
    Node *prev = NULL;
    while (p->data != x && p->next != head) { prev = p; p = p->next; }
    if (p->data != x) return;
    if (p == head) {
        if (head->next == head) { free(head); head = NULL; return; }
        Node *last = head;
        while (last->next != head) last = last->next;
        head = head->next;
        last->next = head;
        free(p);
    } else {
        prev->next = p->next;
        free(p);
    }
}

void display(void) {
    if (head == NULL) { printf("Empty
"); return; }
    Node *p = head;
    do { printf("%d -> ", p->data); p = p->next; } while (p != head);
    printf("HEAD
");
}

int main(void) {
    insertEnd(10);
    insertEnd(20);
    insertBeginning(5);
    display();
    deleteValue(10);
    display();
    return 0;
}`;
function stack(){return pageIntro('Stack','LIFO structure with complete C implementations using both an array and a linked list.')+`<div class="topic-grid"><article class="topic-card"><h3>LIFO Operations</h3><ul><li>Push — insert at top</li><li>Pop — remove top</li><li>Peek — inspect top</li><li>Overflow / Underflow</li></ul></article><article class="topic-card"><h3>Applications</h3><p>Recursion, function calls, undo, expression conversion, parentheses matching and backtracking.</p></article></div><div class="panel"><h3>Stack Using Array — C</h3>${codeCard(stackArrayCode,'C Program')}</div><div class="panel"><h3>Stack Using Linked List — C</h3>${codeCard(stackListCode,'C Program')}</div><div class="panel"><h3>Animated Stack Operations</h3><div class="controls"><input id="stackVal" value="50" type="number"><button class="primary-btn" onclick="stackPush()">Push</button><button class="ghost-btn" onclick="stackPop()">Pop</button><button class="ghost-btn" onclick="stackPeek()">Peek</button></div><div class="stack-viz" id="stackViz"><div class="stack-item">10</div><div class="stack-item">20</div><div class="stack-item">30</div></div><div id="stackStatus" class="result-box">Top = 30</div></div><div class="panel"><h3>Infix → Postfix, Parentheses Matching & Recursion</h3><p><b>A+B*C → ABC*+</b>. A stack stores operators during conversion and opening parentheses during matching. Recursive function calls are also managed by the call stack.</p></div>${markBtn('stack')}`}
const stackArrayCode=`#include <stdio.h>

#define MAX 5

int stack[MAX];
int top = -1;

void push(int x) {
    if (top == MAX - 1) {
        printf("Stack Overflow
");
        return;
    }
    stack[++top] = x;
}

int pop(void) {
    if (top == -1) {
        printf("Stack Underflow
");
        return -1;
    }
    return stack[top--];
}

int peek(void) {
    if (top == -1) return -1;
    return stack[top];
}

void display(void) {
    for (int i = top; i >= 0; i--)
        printf("%d ", stack[i]);
    printf("
");
}

int main(void) {
    push(10);
    push(20);
    push(30);
    display();
    printf("Popped: %d
", pop());
    printf("Top: %d
", peek());
    return 0;
}`;
const stackListCode=`#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int data;
    struct Node *next;
} Node;

Node *top = NULL;

void push(int x) {
    Node *n = malloc(sizeof(Node));
    n->data = x;
    n->next = top;
    top = n;
}

int pop(void) {
    if (top == NULL) {
        printf("Stack Underflow
");
        return -1;
    }
    Node *t = top;
    int x = t->data;
    top = top->next;
    free(t);
    return x;
}

int peek(void) {
    return top != NULL ? top->data : -1;
}

void display(void) {
    for (Node *p = top; p != NULL; p = p->next)
        printf("%d ", p->data);
    printf("
");
}

int main(void) {
    push(10);
    push(20);
    push(30);
    display();
    printf("Popped: %d
", pop());
    printf("Top: %d
", peek());
    return 0;
}`;
window.stackPush=()=>{let v=document.querySelector('#stackVal').value;if(v==='')return;let e=document.createElement('div');e.className='stack-item pulse';e.textContent=v;document.querySelector('#stackViz').appendChild(e);document.querySelector('#stackStatus').textContent='Push: '+v+' is now on top';};window.stackPop=()=>{let e=document.querySelector('#stackViz .stack-item:last-child');if(!e)return;let v=e.textContent;e.remove();document.querySelector('#stackStatus').textContent='Pop: '+v+' removed';};window.stackPeek=()=>{let e=document.querySelector('#stackViz .stack-item:last-child');document.querySelector('#stackStatus').textContent=e?'Peek → '+e.textContent:'Underflow: stack is empty'};
function queue(){return pageIntro('Queue','FIFO structure with complete C implementations using an array and a linked list, plus circular queue, priority queue and deque concepts.')+`<div class="topic-grid"><article class="topic-card"><h3>FIFO Operations</h3><ul><li>Enqueue — insert at rear</li><li>Dequeue — remove from front</li><li>Front / Rear</li><li>Overflow / Underflow</li></ul></article><article class="topic-card"><h3>Queue Types</h3><ul><li>Simple Queue</li><li>Circular Queue</li><li>Priority Queue</li><li>Deque</li></ul></article></div><div class="panel"><h3>Queue Using Array — C</h3>${codeCard(queueArrayCode,'C Program')}</div><div class="panel"><h3>Queue Using Linked List — C</h3>${codeCard(queueListCode,'C Program')}</div><div class="panel"><h3>Circular Queue — C</h3>${codeCard(circularQueueCode,'C Program')}</div><div class="panel"><h3>Animated Queue Operations</h3><div class="controls"><input id="queueVal" value="40" type="number"><button class="primary-btn" onclick="enqueue()">Enqueue</button><button class="ghost-btn" onclick="dequeue()">Dequeue</button></div><div class="queue-viz" id="queueViz"><span class="chip">Front</span><div class="queue-item">10</div><div class="queue-item">20</div><div class="queue-item">30</div><span class="chip">Rear</span></div><div id="queueStatus" class="result-box">Front = 10, Rear = 30</div></div>${markBtn('queue')}`}
const queueArrayCode=`#include <stdio.h>

#define MAX 5

int q[MAX];
int front = 0;
int rear = -1;

void enqueue(int x) {
    if (rear == MAX - 1) {
        printf("Queue Overflow
");
        return;
    }
    q[++rear] = x;
}

int dequeue(void) {
    if (front > rear) {
        printf("Queue Underflow
");
        return -1;
    }
    return q[front++];
}

void display(void) {
    for (int i = front; i <= rear; i++)
        printf("%d ", q[i]);
    printf("
");
}

int main(void) {
    enqueue(10);
    enqueue(20);
    enqueue(30);
    display();
    printf("Dequeued: %d
", dequeue());
    display();
    return 0;
}`;
const queueListCode=`#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int data;
    struct Node *next;
} Node;

Node *front = NULL;
Node *rear = NULL;

void enqueue(int x) {
    Node *n = malloc(sizeof(Node));
    n->data = x;
    n->next = NULL;
    if (rear == NULL)
        front = rear = n;
    else {
        rear->next = n;
        rear = n;
    }
}

int dequeue(void) {
    if (front == NULL) {
        printf("Queue Underflow
");
        return -1;
    }
    Node *t = front;
    int x = t->data;
    front = front->next;
    if (front == NULL) rear = NULL;
    free(t);
    return x;
}

void display(void) {
    for (Node *p = front; p != NULL; p = p->next)
        printf("%d ", p->data);
    printf("
");
}

int main(void) {
    enqueue(10);
    enqueue(20);
    enqueue(30);
    display();
    printf("Dequeued: %d
", dequeue());
    display();
    return 0;
}`;
const circularQueueCode=`#include <stdio.h>

#define MAX 5

int q[MAX];
int front = -1;
int rear = -1;

int isFull(void) {
    return front == (rear + 1) % MAX;
}

int isEmpty(void) {
    return front == -1;
}

void enqueue(int x) {
    if (isFull()) {
        printf("Overflow
");
        return;
    }
    if (isEmpty()) front = 0;
    rear = (rear + 1) % MAX;
    q[rear] = x;
}

int dequeue(void) {
    if (isEmpty()) {
        printf("Underflow
");
        return -1;
    }
    int x = q[front];
    if (front == rear)
        front = rear = -1;
    else
        front = (front + 1) % MAX;
    return x;
}

int main(void) {
    enqueue(10);
    enqueue(20);
    enqueue(30);
    printf("Dequeued: %d
", dequeue());
    enqueue(40);
    enqueue(50);
    return 0;
}`;
window.enqueue=()=>{let v=document.querySelector('#queueVal').value;if(v==='')return;let e=document.createElement('div');e.className='queue-item pulse';e.textContent=v;let q=document.querySelector('#queueViz');q.insertBefore(e,q.lastElementChild);document.querySelector('#queueStatus').textContent='Enqueue: '+v+' added at rear';};window.dequeue=()=>{let e=document.querySelector('#queueViz .queue-item');if(!e)return;let v=e.textContent;e.remove();document.querySelector('#queueStatus').textContent='Dequeue: '+v+' removed from front';};
const treeBSTCode=`#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int data;
    struct Node *left;
    struct Node *right;
} Node;

Node *createNode(int value) {
    Node *newNode = (Node *)malloc(sizeof(Node));
    newNode->data = value;
    newNode->left = NULL;
    newNode->right = NULL;
    return newNode;
}

Node *insert(Node *root, int value) {
    if (root == NULL)
        return createNode(value);

    if (value < root->data)
        root->left = insert(root->left, value);
    else if (value > root->data)
        root->right = insert(root->right, value);

    return root;
}

void inorder(Node *root) {
    if (root != NULL) {
        inorder(root->left);
        printf("%d ", root->data);
        inorder(root->right);
    }
}

void preorder(Node *root) {
    if (root != NULL) {
        printf("%d ", root->data);
        preorder(root->left);
        preorder(root->right);
    }
}

void postorder(Node *root) {
    if (root != NULL) {
        postorder(root->left);
        postorder(root->right);
        printf("%d ", root->data);
    }
}

int main(void) {
    Node *root = NULL;
    int values[] = {50, 30, 70, 20, 40, 60, 80};
    int n = sizeof(values) / sizeof(values[0]);

    for (int i = 0; i < n; i++)
        root = insert(root, values[i]);

    printf("Inorder: ");
    inorder(root);
    printf("\\nPreorder: ");
    preorder(root);
    printf("\\nPostorder: ");
    postorder(root);
    printf("\\n");

    return 0;
}`;

const graphCode=`#include <stdio.h>
#define MAX 10

void bfs(int graph[MAX][MAX], int n, int start) {
    int queue[MAX];
    int visited[MAX] = {0};
    int front = 0, rear = 0;

    queue[rear++] = start;
    visited[start] = 1;

    while (front < rear) {
        int current = queue[front++];
        printf("%d ", current);

        for (int i = 0; i < n; i++) {
            if (graph[current][i] && !visited[i]) {
                visited[i] = 1;
                queue[rear++] = i;
            }
        }
    }
}

void dfs(int graph[MAX][MAX], int n, int vertex, int visited[]) {
    visited[vertex] = 1;
    printf("%d ", vertex);

    for (int i = 0; i < n; i++) {
        if (graph[vertex][i] && !visited[i])
            dfs(graph, n, i, visited);
    }
}

int main(void) {
    int graph[MAX][MAX] = {0};
    int visited[MAX] = {0};
    int n = 6;

    graph[0][1] = graph[1][0] = 1;
    graph[0][2] = graph[2][0] = 1;
    graph[1][3] = graph[3][1] = 1;
    graph[2][4] = graph[4][2] = 1;
    graph[3][5] = graph[5][3] = 1;
    graph[4][5] = graph[5][4] = 1;

    printf("BFS from vertex 0: ");
    bfs(graph, n, 0);

    printf("\\nDFS from vertex 0: ");
    dfs(graph, n, 0, visited);
    printf("\\n");

    return 0;
}`;

const linearSearchCode=`#include <stdio.h>

int linearSearch(int a[], int n, int key) {
    for (int i = 0; i < n; i++) {
        if (a[i] == key)
            return i;
    }
    return -1;
}

int main(void) {
    int a[] = {25, 10, 40, 15, 30};
    int n = sizeof(a) / sizeof(a[0]);
    int key = 40;
    int position = linearSearch(a, n, key);

    if (position != -1)
        printf("Element %d found at index %d\\n", key, position);
    else
        printf("Element %d not found\\n", key);

    return 0;
}`;

const binarySearchCode=`#include <stdio.h>

int binarySearch(int a[], int n, int key) {
    int low = 0;
    int high = n - 1;

    while (low <= high) {
        int mid = low + (high - low) / 2;

        if (a[mid] == key)
            return mid;
        else if (a[mid] < key)
            low = mid + 1;
        else
            high = mid - 1;
    }

    return -1;
}

int main(void) {
    int a[] = {10, 20, 30, 40, 50, 60, 70};
    int n = sizeof(a) / sizeof(a[0]);
    int key = 40;
    int position = binarySearch(a, n, key);

    if (position != -1)
        printf("Element %d found at index %d\\n", key, position);
    else
        printf("Element %d not found\\n", key);

    return 0;
}`;

const bubbleSortCode=`#include <stdio.h>

void bubbleSort(int a[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int swapped = 0;

        for (int j = 0; j < n - i - 1; j++) {
            if (a[j] > a[j + 1]) {
                int temp = a[j];
                a[j] = a[j + 1];
                a[j + 1] = temp;
                swapped = 1;
            }
        }

        if (!swapped)
            break;
    }
}

int main(void) {
    int a[] = {42, 18, 35, 9, 27, 14};
    int n = sizeof(a) / sizeof(a[0]);

    bubbleSort(a, n);

    printf("Sorted array: ");
    for (int i = 0; i < n; i++)
        printf("%d ", a[i]);
    printf("\\n");

    return 0;
}`;

const selectionSortCode=`#include <stdio.h>

void selectionSort(int a[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int minIndex = i;

        for (int j = i + 1; j < n; j++) {
            if (a[j] < a[minIndex])
                minIndex = j;
        }

        int temp = a[i];
        a[i] = a[minIndex];
        a[minIndex] = temp;
    }
}

int main(void) {
    int a[] = {64, 25, 12, 22, 11};
    int n = sizeof(a) / sizeof(a[0]);

    selectionSort(a, n);

    printf("Sorted array: ");
    for (int i = 0; i < n; i++)
        printf("%d ", a[i]);
    printf("\\n");

    return 0;
}`;

const insertionSortCode=`#include <stdio.h>

void insertionSort(int a[], int n) {
    for (int i = 1; i < n; i++) {
        int key = a[i];
        int j = i - 1;

        while (j >= 0 && a[j] > key) {
            a[j + 1] = a[j];
            j--;
        }

        a[j + 1] = key;
    }
}

int main(void) {
    int a[] = {12, 11, 13, 5, 6};
    int n = sizeof(a) / sizeof(a[0]);

    insertionSort(a, n);

    printf("Sorted array: ");
    for (int i = 0; i < n; i++)
        printf("%d ", a[i]);
    printf("\\n");

    return 0;
}`;

const mergeSortCode=`#include <stdio.h>

void merge(int a[], int low, int mid, int high) {
    int temp[100];
    int i = low, j = mid + 1, k = 0;

    while (i <= mid && j <= high) {
        if (a[i] <= a[j])
            temp[k++] = a[i++];
        else
            temp[k++] = a[j++];
    }

    while (i <= mid)
        temp[k++] = a[i++];

    while (j <= high)
        temp[k++] = a[j++];

    for (i = low, k = 0; i <= high; i++, k++)
        a[i] = temp[k];
}

void mergeSort(int a[], int low, int high) {
    if (low < high) {
        int mid = low + (high - low) / 2;
        mergeSort(a, low, mid);
        mergeSort(a, mid + 1, high);
        merge(a, low, mid, high);
    }
}

int main(void) {
    int a[] = {38, 27, 43, 3, 9, 82, 10};
    int n = sizeof(a) / sizeof(a[0]);

    mergeSort(a, 0, n - 1);

    printf("Sorted array: ");
    for (int i = 0; i < n; i++)
        printf("%d ", a[i]);
    printf("\\n");

    return 0;
}`;

const quickSortCode=`#include <stdio.h>

void swap(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

int partition(int a[], int low, int high) {
    int pivot = a[high];
    int i = low - 1;

    for (int j = low; j < high; j++) {
        if (a[j] <= pivot) {
            i++;
            swap(&a[i], &a[j]);
        }
    }

    swap(&a[i + 1], &a[high]);
    return i + 1;
}

void quickSort(int a[], int low, int high) {
    if (low < high) {
        int p = partition(a, low, high);
        quickSort(a, low, p - 1);
        quickSort(a, p + 1, high);
    }
}

int main(void) {
    int a[] = {10, 7, 8, 9, 1, 5};
    int n = sizeof(a) / sizeof(a[0]);

    quickSort(a, 0, n - 1);

    printf("Sorted array: ");
    for (int i = 0; i < n; i++)
        printf("%d ", a[i]);
    printf("\\n");

    return 0;
}`;

const heapSortCode=`#include <stdio.h>

void swap(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

void heapify(int a[], int n, int i) {
    int largest = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;

    if (left < n && a[left] > a[largest])
        largest = left;

    if (right < n && a[right] > a[largest])
        largest = right;

    if (largest != i) {
        swap(&a[i], &a[largest]);
        heapify(a, n, largest);
    }
}

void heapSort(int a[], int n) {
    for (int i = n / 2 - 1; i >= 0; i--)
        heapify(a, n, i);

    for (int i = n - 1; i > 0; i--) {
        swap(&a[0], &a[i]);
        heapify(a, i, 0);
    }
}

int main(void) {
    int a[] = {12, 11, 13, 5, 6, 7};
    int n = sizeof(a) / sizeof(a[0]);

    heapSort(a, n);

    printf("Sorted array: ");
    for (int i = 0; i < n; i++)
        printf("%d ", a[i]);
    printf("\\n");

    return 0;
}`;

function trees(){return pageIntro('Trees','A tree is a hierarchical non-linear data structure. Before writing a program, understand how the root, parent, child, leaf and subtrees are connected. A Binary Tree has at most two children per node; a Binary Search Tree (BST) maintains an ordering that makes searching and insertion efficient in the average case.')+`<div class="topic-grid"><article class="topic-card"><h3>Tree Terminology</h3><p><b>Root:</b> top node. <b>Parent:</b> node directly above another node. <b>Child:</b> node directly below a parent. <b>Leaf:</b> node with no children. <b>Height:</b> longest path from a node to a leaf. <b>Subtree:</b> a node and all of its descendants.</p></article><article class="topic-card"><h3>Binary Tree</h3><p>Each node can have zero, one or two children. Binary trees are useful for hierarchical representation and form the basis for BSTs, heaps and expression trees.</p></article><article class="topic-card"><h3>Binary Search Tree</h3><p>For each node, values smaller than the node are stored in the left subtree and larger values in the right subtree. This ordering supports search, insertion and deletion.</p></article><article class="topic-card"><h3>Tree Traversals</h3><ul><li><b>Preorder:</b> Root → Left → Right</li><li><b>Inorder:</b> Left → Root → Right</li><li><b>Postorder:</b> Left → Right → Root</li><li><b>Level-order:</b> Visit level by level using a queue</li></ul></article><article class="topic-card"><h3>Applications</h3><p>File systems, database indexing, expression evaluation, decision trees, compiler syntax trees, XML/HTML DOM structures and hierarchical organization.</p></article><article class="topic-card"><h3>Insertion & Deletion</h3><p>BST insertion follows comparisons from the root. Deletion has three cases: leaf node, one child, or two children. For two children, the inorder successor or predecessor can replace the deleted node.</p></article></div><div class="panel"><h3>BST Diagram and Traversal Visualization</h3><div class="tree"><svg viewBox="0 0 600 280" width="700"><g stroke="#7aa8eb" stroke-width="3"><line x1="300" y1="55" x2="180" y2="125"/><line x1="300" y1="55" x2="420" y2="125"/><line x1="180" y1="125" x2="110" y2="210"/><line x1="180" y1="125" x2="245" y2="210"/><line x1="420" y1="125" x2="355" y2="210"/><line x1="420" y1="125" x2="495" y2="210"/></g>${[[300,45,50],[180,125,30],[420,125,70],[110,215,20],[245,215,40],[355,215,60],[495,215,80]].map(n=>`<g><circle cx="${n[0]}" cy="${n[1]}" r="27" fill="#fff" stroke="#1255d6" stroke-width="3"/><text x="${n[0]}" y="${n[1]+5}" text-anchor="middle" font-size="15" font-weight="700">${n[2]}</text></g>`).join('')}</svg></div><div class="controls"><select id="trav"><option>Inorder</option><option>Preorder</option><option>Postorder</option><option>Level-order</option></select><button class="primary-btn" onclick="treeTraversal()">Show Traversal</button></div><div class="result-box" id="treeResult">Select a traversal to see the visiting sequence.</div></div><div class="panel"><h3>Complete BST C Program</h3><p>After understanding the tree structure and traversal rules above, study the C implementation below. The program creates a BST, inserts values and displays three standard traversals.</p>${codeCard(treeBSTCode,'C: Binary Search Tree')}</div>${markBtn('trees')}`}
window.treeTraversal=()=>{let t=document.querySelector('#trav').value,m={'Inorder':'20 → 30 → 40 → 50 → 60 → 70 → 80','Preorder':'50 → 30 → 20 → 40 → 70 → 60 → 80','Postorder':'20 → 40 → 30 → 60 → 80 → 70 → 50','Level-order':'50 → 30 → 70 → 20 → 40 → 60 → 80'};document.querySelector('#treeResult').textContent=m[t]};

function graphs(){return pageIntro('Graphs','A graph models relationships between objects. A graph contains vertices (nodes) and edges (connections). Graphs may be directed or undirected, weighted or unweighted, connected or disconnected. Before writing code, understand how a graph is represented and how traversal works.')+`<div class="topic-grid"><article class="topic-card"><h3>Vertices and Edges</h3><p><b>Vertex:</b> an individual node. <b>Edge:</b> a connection between two vertices. A graph with vertices A–F can represent cities, computers, people or webpages and the relationships between them.</p></article><article class="topic-card"><h3>Graph Types</h3><ul><li>Directed / Undirected</li><li>Weighted / Unweighted</li><li>Connected / Disconnected</li><li>Cyclic / Acyclic</li></ul></article><article class="topic-card"><h3>Adjacency Matrix</h3><p>A two-dimensional V × V matrix stores whether an edge exists between two vertices. It provides O(1) edge lookup but needs O(V²) memory.</p></article><article class="topic-card"><h3>Adjacency List</h3><p>Each vertex stores a list of its neighboring vertices. It uses O(V + E) space and is generally preferred for sparse graphs.</p></article><article class="topic-card"><h3>BFS</h3><p><b>Breadth-First Search</b> visits vertices level by level. It uses a queue and is useful for shortest paths in unweighted graphs and level-wise network exploration.</p></article><article class="topic-card"><h3>DFS</h3><p><b>Depth-First Search</b> explores one path deeply before backtracking. It can be implemented recursively or with a stack and is useful for connectivity, cycle detection and path exploration.</p></article></div><div class="panel"><h3>Graph Diagram and Traversal Visualization</h3><div class="tree"><svg class="graph-svg" viewBox="0 0 640 300" width="760"><g stroke="#7aa8eb" stroke-width="3">${[[120,150,250,60],[120,150,250,240],[250,60,390,80],[250,240,390,220],[390,80,520,150],[390,220,520,150],[250,60,390,220],[250,240,390,80]].map(e=>`<line x1="${e[0]}" y1="${e[1]}" x2="${e[2]}" y2="${e[3]}"/>`).join('')}</g>${[[120,150,'A'],[250,60,'B'],[250,240,'C'],[390,80,'D'],[390,220,'E'],[520,150,'F']].map(n=>`<g><circle cx="${n[0]}" cy="${n[1]}" r="26" fill="#fff" stroke="#1255d6" stroke-width="3"/><text x="${n[0]}" y="${n[1]+5}" text-anchor="middle" font-weight="800">${n[2]}</text></g>`).join('')}</svg></div><div class="controls"><button class="primary-btn" onclick="graphVisit('BFS')">BFS from A</button><button class="ghost-btn" onclick="graphVisit('DFS')">DFS from A</button></div><div class="result-box" id="graphResult">Choose BFS or DFS to see the visiting sequence.</div></div><div class="panel"><h3>Complete Graph C Program</h3><p>Once the representation and traversal concepts are clear, the following C program builds an undirected graph with an adjacency matrix and demonstrates both BFS and DFS from vertex 0.</p>${codeCard(graphCode,'C: BFS and DFS using Adjacency Matrix')}</div><div class="panel"><h3>Real-world Applications</h3><p>Road maps, airline routes, social networks, computer networks, recommendation systems, dependency graphs and knowledge graphs can all be represented as graphs.</p></div>${markBtn('graphs')}`}
window.graphVisit=t=>document.querySelector('#graphResult').textContent=t==='BFS'?'BFS: A → B → C → D → E → F':'DFS: A → B → D → F → E → C';

function searching(){return pageIntro('Searching','Searching locates a required key in a collection. This section now provides complete visualizations for both Linear Search and Binary Search before the C programs.')+`<div class="topic-grid"><article class="topic-card"><h3>Linear Search</h3><p>Checks elements one by one from left to right. It works with sorted or unsorted data and has O(n) worst-case time.</p></article><article class="topic-card"><h3>Binary Search</h3><p>Works on a sorted array. It compares the key with the middle element and repeatedly discards half of the remaining search interval.</p></article></div>
<div class="panel"><h3>Linear Search — Complete Visualization</h3><p>The current element is highlighted as the algorithm checks every position sequentially.</p><div class="controls"><input id="linearKey" type="number" value="35"><button class="primary-btn" onclick="linearSearchViz()">Animate Linear Search</button><button class="ghost-btn" onclick="resetSearchViz('linear')">Reset</button></div><div class="array-row search-stage" id="linearSearchArray">${[12,25,7,35,18,50,42].map((x,i)=>`<div class="cell" data-v="${x}">${x}<small>${i}</small></div>`).join('')}</div><div class="result-box" id="linearSearchResult">Enter a key and start the visualization.</div></div>
<div class="panel"><h3>Binary Search — Complete Visualization</h3><p>Low, middle and high positions are shown during every step so students can see how the active range is halved.</p><div class="controls"><input id="searchKey" type="number" value="40"><button class="primary-btn" onclick="binaryViz()">Animate Binary Search</button><button class="ghost-btn" onclick="resetSearchViz('binary')">Reset</button></div><div class="array-row search-stage" id="searchArray">${[10,20,30,40,50,60,70].map((x,i)=>`<div class="cell" data-v="${x}">${x}<small>${i}</small></div>`).join('')}</div><div class="result-box" id="searchResult">Enter a key and start the visualization.</div></div>
<div class="panel"><h3>Linear Search C Program</h3>${codeCard(linearSearchCode,'C: Linear Search')}</div><div class="panel"><h3>Binary Search C Program</h3>${codeCard(binarySearchCode,'C: Binary Search')}</div><div class="panel"><h3>Complexity Comparison</h3><table class="data-table"><tr><th>Algorithm</th><th>Prerequisite</th><th>Best</th><th>Average</th><th>Worst</th><th>Space</th></tr><tr><td>Linear Search</td><td>None</td><td>O(1)</td><td>O(n)</td><td>O(n)</td><td>O(1)</td></tr><tr><td>Binary Search</td><td>Sorted array</td><td>O(1)</td><td>O(log n)</td><td>O(log n)</td><td>O(1)</td></tr></table></div>${markBtn('searching')}`}

function sorting(){return pageIntro('Sorting','Sorting arranges data in a required order. Every algorithm below now has its own animation so students can compare the exact movement of elements before reading the C program.')+`<div class="topic-grid"><article class="topic-card"><h3>Bubble Sort</h3><p>Compares adjacent elements and swaps them when needed. The largest unsorted value moves to the end after each pass.</p></article><article class="topic-card"><h3>Selection Sort</h3><p>Finds the minimum element in the unsorted section and swaps it with the first unsorted position.</p></article><article class="topic-card"><h3>Insertion Sort</h3><p>Takes the next key and inserts it into the correct position in the already sorted left part.</p></article><article class="topic-card"><h3>Merge Sort</h3><p>Divides the array into smaller halves, sorts them recursively and merges the sorted parts.</p></article><article class="topic-card"><h3>Quick Sort</h3><p>Selects a pivot, partitions smaller and larger elements around it and recursively sorts both partitions.</p></article><article class="topic-card"><h3>Heap Sort</h3><p>Builds a max heap and repeatedly moves the root (largest value) to the end of the array.</p></article></div>
<div class="panel"><h3>Sorting Complexity Comparison</h3><table class="complexity-table"><tr><th>Algorithm</th><th>Best</th><th>Average</th><th>Worst</th><th>Extra Space</th><th>Stable</th></tr><tr><td>Bubble</td><td>O(n)</td><td>O(n²)</td><td>O(n²)</td><td>O(1)</td><td>Yes</td></tr><tr><td>Selection</td><td>O(n²)</td><td>O(n²)</td><td>O(n²)</td><td>O(1)</td><td>No</td></tr><tr><td>Insertion</td><td>O(n)</td><td>O(n²)</td><td>O(n²)</td><td>O(1)</td><td>Yes</td></tr><tr><td>Merge</td><td>O(n log n)</td><td>O(n log n)</td><td>O(n log n)</td><td>O(n)</td><td>Yes</td></tr><tr><td>Quick</td><td>O(n log n)</td><td>O(n log n)</td><td>O(n²)</td><td>O(log n)*</td><td>No</td></tr><tr><td>Heap</td><td>O(n log n)</td><td>O(n log n)</td><td>O(n log n)</td><td>O(1)</td><td>No</td></tr></table></div>
${sortVizPanel('bubble','Bubble Sort')}${sortVizPanel('selection','Selection Sort')}${sortVizPanel('insertion','Insertion Sort')}${sortVizPanel('merge','Merge Sort')}${sortVizPanel('quick','Quick Sort')}${sortVizPanel('heap','Heap Sort')}
<div class="panel"><h3>Bubble Sort C Program</h3>${codeCard(bubbleSortCode,'C: Bubble Sort')}</div><div class="panel"><h3>Selection Sort C Program</h3>${codeCard(selectionSortCode,'C: Selection Sort')}</div><div class="panel"><h3>Insertion Sort C Program</h3>${codeCard(insertionSortCode,'C: Insertion Sort')}</div><div class="panel"><h3>Merge Sort C Program</h3>${codeCard(mergeSortCode,'C: Merge Sort')}</div><div class="panel"><h3>Quick Sort C Program</h3>${codeCard(quickSortCode,'C: Quick Sort')}</div><div class="panel"><h3>Heap Sort C Program</h3>${codeCard(heapSortCode,'C: Heap Sort')}</div>${markBtn('sorting')}`}
function sortVizPanel(type,title){return `<div class="panel sort-viz-panel"><h3>${title} — Visualization</h3><div class="controls"><button class="primary-btn" onclick="runSortViz('${type}')">Animate ${title}</button><button class="ghost-btn" onclick="resetSortViz('${type}')">Reset</button></div><div class="array-row sort-stage" id="sort-${type}">${[42,18,35,9,27,14].map((x,i)=>`<div class="cell" data-i="${i}">${x}<small>${i}</small></div>`).join('')}</div><div class="result-box" id="sort-${type}-status">Ready. Click Animate to start.</div></div>`}

function recursion(){return pageIntro('Recursion','Recursion solves a problem by calling the same function on a smaller instance until a base case is reached.')+`<div class="topic-grid"><article class="topic-card"><h3>Basic Concept</h3><p>Every recursive solution needs a <b>base case</b> that stops recursion and a <b>recursive case</b> that moves toward the base case.</p><div class="diagram flow"><span class="flow-box">f(4)</span><span>→</span><span class="flow-box">f(3)</span><span>→</span><span class="flow-box">f(2)</span><span>→</span><span class="flow-box">f(1)</span></div></article><article class="topic-card"><h3>Factorial</h3><p>n! = n × (n−1)! with base case 0! = 1. Time O(n), recursion stack O(n).</p></article><article class="topic-card"><h3>Fibonacci</h3><p>Naive recursion computes F(n)=F(n−1)+F(n−2) but repeats work, causing exponential time. Dynamic programming improves it to O(n).</p></article><article class="topic-card"><h3>Recursion vs Iteration</h3><p>Recursion can be clearer for trees and divide-and-conquer, while iteration generally avoids call-stack overhead and may use less memory.</p></article></div>${codeCard(snippets.recursion,'C: Recursive Factorial')}<div class="panel"><h3>Tower of Hanoi</h3><div class="controls"><input id="hanoiN" type="number" min="1" max="8" value="3"><button class="primary-btn" onclick="hanoi()">Generate Moves</button></div><div id="hanoiOut" class="result-box">For 3 disks, minimum moves = 7.</div></div>${markBtn('recursion')}`}
window.hanoi=()=>{let n=Math.min(8,Math.max(1,+document.querySelector('#hanoiN').value)),moves=[];function go(k,a,b,c){if(!k)return;go(k-1,a,c,b);moves.push(`Move disk ${k}: ${a} → ${c}`);go(k-1,b,a,c)}go(n,'A','B','C');document.querySelector('#hanoiOut').innerHTML=`<b>${moves.length} moves</b><br>${moves.join('<br>')}`};
function lab(){let exps=[['Array Operations','Traversal, insertion, deletion and searching'],['Singly Linked List','Create, insert, delete, search and display nodes'],['Doubly Linked List','Insert/delete with prev and next links; forward/backward traversal'],['Circular Linked List','Insert/delete and circular traversal'],['Stack Using Array','Push, pop, peek, overflow and underflow'],['Stack Using Linked List','Dynamic push and pop'],['Queue Using Array','Enqueue and dequeue'],['Queue Using Linked List','Dynamic queue with front and rear'],['Circular Queue','Modulo-based circular indexing'],['Trees','BST insertion and traversals'],['Graphs','BFS and DFS'],['Searching','Linear and binary search'],['Sorting','Bubble, selection, insertion, merge and quick sort'],['Recursion','Factorial, Fibonacci and Tower of Hanoi']];return pageIntro('Programming Lab','Experiment-wise C programming with an editor that sends the code to a C compiler and displays the actual compiler output.')+`<div class="lab-list">${exps.map((e,i)=>`<details class="lab-exp"><summary>Experiment ${i+1}: ${e[0]}</summary><p>${e[1]}</p><p><b>Requirement:</b> Write the algorithm, C program, sample input/output and complexity analysis.</p></details>`).join('')}</div><div class="section-head"><div><span>C Language</span><h3>Practice Editor & C Compiler</h3></div></div><textarea class="code-editor" id="editor">${snippets.arrays}</textarea><div class="controls"><button class="primary-btn" onclick="runCCode()">▶ Run C Code</button><button class="ghost-btn" onclick="loadEditor('arrays')">Load Array</button><button class="ghost-btn" onclick="loadEditor('linked')">Load Linked List</button><button class="ghost-btn" onclick="loadEditor('stack')">Load Stack</button><button class="ghost-btn" onclick="loadEditor('queue')">Load Queue</button></div><div class="notice"><b>How it works:</b> Your C source is submitted to a GCC-based online compiler. The returned stdout/stderr is shown below. Internet access is required for execution.</div><div class="output" id="codeOutput">Click “Run C Code” to compile and execute the program.</div>${markBtn('lab')}`}
window.loadEditor=k=>{document.querySelector('#editor').value=snippets[k]||snippets.arrays;document.querySelector('#codeOutput').textContent='Loaded '+k+' C program.'};
window.runCCode=async()=>{const out=document.querySelector('#codeOutput'),code=document.querySelector('#editor').value.trim();if(!code){out.textContent='Please enter C code.';return;}if(!/\#include\s*<stdio\.h>/.test(code)){out.textContent='Only C programs are supported. Include <stdio.h> in your program.';return;}out.textContent='Compiling and running C code…';const show=(text)=>{out.textContent=(text||'').trim()||'Program executed successfully with no output.';};const runWandbox=async()=>{const r=await fetch('https://wandbox.org/api/compile.json',{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify({compiler:'gcc-head',code,stdin:'',options:[],compiler_option_raw:'-std=c11 -O0 -Wall'})});const raw=await r.text();if(!r.ok)throw new Error('Compiler service returned HTTP '+r.status+(raw?' - '+raw.slice(0,180):''));let j;try{j=JSON.parse(raw);}catch(_){throw new Error('Compiler service returned a non-JSON response: '+raw.slice(0,180));}return (j.program_output||'')+(j.program_error?('\n'+j.program_error):'')+(j.compiler_error?('\n'+j.compiler_error):'');};const runPiston=async()=>{const r=await fetch('https://emkc.org/api/v2/piston/execute',{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify({language:'c',version:'10.2.0',files:[{name:'main.c',content:code}],stdin:''})});const raw=await r.text();if(!r.ok)throw new Error('Backup compiler returned HTTP '+r.status+(raw?' - '+raw.slice(0,180):''));let j;try{j=JSON.parse(raw);}catch(_){throw new Error('Backup compiler returned a non-JSON response: '+raw.slice(0,180));}const c=j.compile||{},run=j.run||{};return [c.output,c.stderr,c.message,run.output,run.stderr,run.message].filter(Boolean).join('\n');};try{try{show(await runWandbox());}catch(firstError){show(await runPiston());}}catch(e){out.textContent='Unable to run the C program right now. Both online compiler services were unavailable.\n\nDetails: '+e.message;}}
function visualization(){return pageIntro('Visualization Lab','Animated, step-by-step visualizations for every major DSA point: arrays, all linked-list types, stack/queue operations, tree traversal, graph traversal and sorting.')+`<div class="panel"><div class="controls"><select id="vizType" onchange="loadViz()"><option>Array</option><option>Linked List</option><option>Stack</option><option>Queue</option><option>Tree Traversal</option><option>Graph Traversal</option><option>Sorting</option></select><button class="primary-btn" onclick="loadViz()">Load Animation</button></div><div class="viz-stage" id="vizStage"></div></div>${markBtn('visualization')}`}
window.loadViz=()=>{let t=document.querySelector('#vizType')?.value,s=document.querySelector('#vizStage');if(!s)return;const buttons=`<div class="controls"><button class="primary-btn" onclick="vizPlay()">▶ Play</button><button class="ghost-btn" onclick="vizStep()">Step</button><button class="ghost-btn" onclick="vizReset()">Reset</button></div><div id="vizStatus" class="result-box">Ready.</div>`;if(t==='Array'){s.innerHTML=`<h3>Array Visualization</h3><p>Traversal, access, insertion and deletion shown step-by-step.</p><div class="array-row" id="vizArray">${[8,3,12,6,10].map((x,i)=>`<div class="cell"><b>${x}</b><small>[${i}]</small></div>`).join('')}</div>${buttons}`}else if(t==='Linked List'){s.innerHTML=`<h3>Linked List Visualization</h3><p>Singly, doubly and circular pointer movement.</p><div class="diagram ll-row" id="vizList">${[8,3,12,6].map(x=>`<div class="ll-node"><span>${x}</span><span>next</span></div>`).join('<span class="arrow">→</span>')}</div>${buttons}`}else if(t==='Stack'){s.innerHTML=`<h3>Stack Animation</h3><p>Push, pop and peek demonstrate LIFO.</p><div class="stack-viz" id="vizStack"><div class="stack-item">A</div><div class="stack-item">B</div><div class="stack-item">C</div></div>${buttons}`}else if(t==='Queue'){s.innerHTML=`<h3>Queue Animation</h3><p>Enqueue and dequeue demonstrate FIFO.</p><div class="queue-viz" id="vizQueue"><span class="chip">Front</span>${[1,2,3,4].map(x=>`<div class="queue-item">${x}</div>`).join('')}<span class="chip">Rear</span></div>${buttons}`}else if(t==='Tree Traversal'){s.innerHTML=`<h3>Tree Traversal Animation</h3><div class="tree"><svg id="vizTree" viewBox="0 0 600 280" width="700"><g stroke="#7aa8eb" stroke-width="3"><line x1="300" y1="55" x2="180" y2="125"/><line x1="300" y1="55" x2="420" y2="125"/><line x1="180" y1="125" x2="110" y2="210"/><line x1="180" y1="125" x2="245" y2="210"/><line x1="420" y1="125" x2="355" y2="210"/><line x1="420" y1="125" x2="495" y2="210"/></g>${[[300,45,50],[180,125,30],[420,125,70],[110,215,20],[245,215,40],[355,215,60],[495,215,80]].map((n,i)=>`<g class="tree-node" data-i="${i}"><circle cx="${n[0]}" cy="${n[1]}" r="27" fill="#fff" stroke="#1255d6" stroke-width="3"/><text x="${n[0]}" y="${n[1]+5}" text-anchor="middle" font-size="15" font-weight="700">${n[2]}</text></g>`).join('')}</svg></div>${buttons}`}else if(t==='Graph Traversal'){s.innerHTML=`<h3>Graph Traversal Animation</h3><svg id="vizGraph" viewBox="0 0 600 300" width="700"><g stroke="#7aa8eb" stroke-width="4">${[['120','70','300','70'],['300','70','480','70'],['120','70','210','220'],['300','70','210','220'],['300','70','390','220'],['480','70','390','220']].map(a=>`<line x1="${a[0]}" y1="${a[1]}" x2="${a[2]}" y2="${a[3]}"/>`).join('')}</g>${[[120,70,'A'],[300,70,'B'],[480,70,'C'],[210,220,'D'],[390,220,'E']].map((n,i)=>`<g class="graph-node" data-i="${i}"><circle cx="${n[0]}" cy="${n[1]}" r="32" fill="#fff" stroke="#1255d6" stroke-width="3"/><text x="${n[0]}" y="${n[1]+6}" text-anchor="middle" font-size="18" font-weight="700">${n[2]}</text></g>`).join('')}</svg>${buttons}`}else{s.innerHTML=`<h3>Sorting Animation</h3><p>Bubble, selection and insertion-style visual comparison.</p><div class="array-row" id="vizSort">${[42,18,35,9,27,14].map(x=>`<div class="cell">${x}</div>`).join('')}</div>${buttons}`};window.vizStepIndex=0};
window.vizStep=()=>{let t=document.querySelector('#vizType').value,els=[];if(t==='Array')els=[...document.querySelectorAll('#vizArray .cell')];else if(t==='Linked List')els=[...document.querySelectorAll('#vizList .ll-node')];else if(t==='Tree Traversal')els=[...document.querySelectorAll('#vizTree .tree-node')];else if(t==='Graph Traversal')els=[...document.querySelectorAll('#vizGraph .graph-node')];else if(t==='Stack')els=[...document.querySelectorAll('#vizStack .stack-item')];else if(t==='Queue')els=[...document.querySelectorAll('#vizQueue .queue-item')];else els=[...document.querySelectorAll('#vizSort .cell')];if(!els.length)return;els.forEach(x=>x.classList.remove('pulse'));let i=window.vizStepIndex%els.length;els[i].classList.add('pulse');document.querySelector('#vizStatus').textContent='Step '+(i+1)+' of '+els.length;window.vizStepIndex++};
window.vizPlay=async()=>{window.vizStepIndex=0;let t=document.querySelector('#vizType').value,n=t==='Graph Traversal'?5:t==='Tree Traversal'?7: t==='Stack'?3:t==='Queue'?4:t==='Linked List'?4:6;for(let i=0;i<n;i++){vizStep();await new Promise(r=>setTimeout(r,550))}};window.vizReset=()=>{window.vizStepIndex=0;loadViz()};
function practice(){
const qs=[
['Which data structure follows LIFO?',['Queue','Stack','Tree','Graph'],1],
['Binary search requires the data to be:',['Random','Sorted','Circular','Linked'],1],
['BFS primarily uses a:',['Stack','Queue','Heap','Array only'],1],
['Worst-case time of binary search is:',['O(1)','O(n)','O(log n)','O(n²)'],2],
['In a BST, keys smaller than a node are typically in its:',['Right subtree','Left subtree','Parent','Level-order queue'],1],
['Which sort guarantees O(n log n) worst-case among these?',['Bubble','Insertion','Merge','Selection'],2],
['Which operation adds an element to a stack?',['Enqueue','Push','InsertRear','Append'],1],
['Which operation removes an element from a queue?',['Pop','Push','Dequeue','Peek'],2],
['The first node of a linked list is called:',['Tail','Root','Head','Top'],2],
['Which linked list has both previous and next pointers?',['Singly','Doubly','Circular singly','Array list'],1],
['In a circular linked list, the last node points to:',['NULL','Previous node','Head','Random node'],2],
['Time complexity of linear search in the worst case is:',['O(1)','O(log n)','O(n)','O(n log n)'],2],
['Which sorting algorithm repeatedly selects the minimum element?',['Selection sort','Bubble sort','Merge sort','Quick sort'],0],
['Which sorting algorithm uses divide and conquer?',['Bubble','Insertion','Merge','Selection'],2],
['A graph consists mainly of:',['Nodes and stacks','Vertices and edges','Keys and values','Rows and columns'],1],
['Which traversal explores a graph level by level?',['DFS','BFS','Inorder','Postorder'],1],
['Which tree traversal gives sorted order for a BST?',['Preorder','Inorder','Postorder','Level order'],1],
['What is the purpose of a base case in recursion?',['To stop recursion','To increase memory','To sort data','To create a queue'],0],
['Which notation represents an asymptotic upper bound?',['Big-O','Big-Ω','Big-Θ','Little-ω'],0],
['Which structure is commonly used for function calls?',['Queue','Stack','Graph','Heap'],1],
['Which sorting algorithm is generally efficient with a good pivot?',['Quick sort','Bubble sort','Selection sort','Heap sort'],0],
['Which search is suitable for an unsorted array?',['Binary search','Linear search','Tree search','Heap search'],1],
['What does FIFO mean?',['First In First Out','First In Final Out','Fast In Fast Out','Final In First Out'],0],
['Which queue allows insertion and deletion at both ends?',['Simple queue','Deque','Priority queue only','Circular stack'],1],
['Which data structure is best suited for hierarchical data?',['Tree','Queue','Array','Stack'],0]
];
return pageIntro('Practice Zone','Complete the test to record your Practice Zone progress. The enlarged question bank covers all major DSA topics.')+`<div class="stats-grid"><article class="stat-card"><span>Question Bank</span><strong>${qs.length}</strong><small>MCQs covering major DSA concepts</small></article><article class="stat-card"><span>Test Completion</span><strong id="practiceStatus">Ready</strong><small>Updated after test submission</small></article><article class="stat-card"><span>Recommended Score</span><strong>60%</strong><small>Target for strong preparation</small></article><article class="stat-card"><span>Progress</span><strong>Combined</strong><small>Shown in Student Progress</small></article></div><div id="quizWrap">${qs.map((q,i)=>`<div class="quiz-card"><h4>${i+1}. ${q[0]}</h4>${q[1].map((o,j)=>`<label class="option"><input type="radio" name="q${i}" value="${j}"> ${o}</label>`).join('')}</div>`).join('')}</div><button class="primary-btn" onclick='scoreQuiz(${JSON.stringify(qs.map(q=>q[2]))})'>Submit Test & Update Progress</button><div id="quizResult"></div><div class="panel" style="margin-top:16px"><h3>Additional Practice Tasks</h3><p><b>Fill in the blank:</b> A ______ is used internally by recursive function calls. <b>True/False:</b> A queue follows LIFO. <b>Output-based:</b> Trace push(10), push(20), pop(), peek(). <b>Coding:</b> Implement insertion at a given position in a singly linked list.</p></div>`+markBtn('practice');
}
window.scoreQuiz=ans=>{let s=0;ans.forEach((a,i)=>{let x=document.querySelector('input[name="q'+i+'"]:checked');if(x&&+x.value===a)s++});let pct=Math.round(s/ans.length*100);let a=JSON.parse(localStorage.getItem('dsaDone')||'[]');if(!a.includes('practice'))a.push('practice');localStorage.setItem('dsaDone',JSON.stringify(a));let status=document.querySelector('#practiceStatus');if(status)status.textContent='Completed';document.querySelector('#quizResult').innerHTML='<div class="result-box"><b>Score: '+s+'/'+ans.length+'</b> ('+pct+'%) — Test submitted successfully. Practice Zone is now marked complete and included in Student Progress.</div>';render('practice')};
function cheat(){return pageIntro('DSA Cheat Sheet','A compact revision guide for complexity, operations, sorting, searching and choosing the right data structure.')+`<div class="cheat-grid"><article class="panel"><h3>Operations Comparison</h3><table class="data-table"><tr><th>Structure</th><th>Access</th><th>Search</th><th>Insert/Delete</th></tr><tr><td>Array</td><td>O(1)</td><td>O(n)</td><td>O(n)</td></tr><tr><td>Linked List</td><td>O(n)</td><td>O(n)</td><td>O(1)*</td></tr><tr><td>Stack</td><td>Top O(1)</td><td>O(n)</td><td>O(1)</td></tr><tr><td>Queue</td><td>Ends O(1)</td><td>O(n)</td><td>O(1)</td></tr><tr><td>BST avg.</td><td>—</td><td>O(log n)</td><td>O(log n)</td></tr><tr><td>Hash table avg.</td><td>—</td><td>O(1)</td><td>O(1)</td></tr></table></article><article class="panel"><h3>Searching Comparison</h3><table class="data-table"><tr><th>Algorithm</th><th>Data</th><th>Time</th></tr><tr><td>Linear Search</td><td>Any sequence</td><td>O(n)</td></tr><tr><td>Binary Search</td><td>Sorted, random access</td><td>O(log n)</td></tr><tr><td>BST Search</td><td>Ordered tree</td><td>O(log n) avg.</td></tr><tr><td>Hash Lookup</td><td>Hash table</td><td>O(1) avg.</td></tr></table></article><article class="panel"><h3>Sorting Summary</h3><p><b>Small/nearly sorted:</b> Insertion Sort<br><b>Stable guaranteed n log n:</b> Merge Sort<br><b>Fast in practice:</b> Quick Sort<br><b>Low auxiliary memory & guaranteed n log n:</b> Heap Sort</p></article><article class="panel"><h3>Selection Guide</h3><p><b>Fast indexed access:</b> Array<br><b>Frequent known-position insertion:</b> Linked List<br><b>Undo / nested calls:</b> Stack<br><b>Scheduling / BFS:</b> Queue<br><b>Hierarchy / ordered search:</b> Tree<br><b>Networks / relationships:</b> Graph<br><b>Fast key lookup:</b> Hash table</p></article></div>${markBtn('cheatsheet')}`}
function combinedProgressHtml(){let {done,pct}=progress();let rows=pages.slice(1,17).map(p=>{let ok=done.includes(p[0]);return `<div class="progress-section-row"><div><b>${esc(p[1])}</b><small>${ok?'Completed':'Not completed'}</small></div><span class="progress-status ${ok?'done':''}">${ok?'✓ 100%':'0%'}</span></div>`}).join('');return `<div class="panel combined-progress"><div class="section-head" style="margin-top:0"><div><span>Combined Student Progress</span><h3>All course sections in one view</h3></div><strong>${pct}% Overall</strong></div><div class="progress-track combined-track"><div style="width:${pct}%"></div></div><p class="muted-note">Progress combines concepts, programming, visualization, practice and resources. Practice Zone is automatically marked complete after the test is submitted.</p><div class="progress-section-list">${rows}</div></div>`}
function student(){return pageIntro('Student Progress & Student Corner','Track your complete DSA learning journey in one place. Every completed section contributes to the combined progress shown below.')+combinedProgressHtml()+`<div class="topic-grid"><article class="topic-card"><h3>Notes</h3><p>Prepare one-page notes for each topic: definition, diagram, operations, complexities, applications and one program.</p></article><article class="topic-card"><h3>Important Questions</h3><p>Compare arrays and linked lists; explain stack applications; implement circular queue; perform BST traversals; differentiate BFS and DFS; compare sorting algorithms.</p></article><article class="topic-card"><h3>Lab Exercises</h3><p>Maintain experiment number, aim, algorithm, source code, sample input/output, result and complexity analysis.</p></article><article class="topic-card"><h3>Practice History</h3><p>Your submitted Practice Zone test is automatically included in the combined progress. Revisit the test anytime for revision.</p></article></div><div class="two-col"><article class="panel"><h3>Student Reviews</h3><div id="allReviews">${reviewsHtml()}</div></article><article class="panel"><h3>Add Review</h3><div class="review-form"><input id="revName" placeholder="Student name"><select id="revStars"><option value="5">5 stars</option><option value="4">4 stars</option><option value="3">3 stars</option><option value="2">2 stars</option><option value="1">1 star</option></select><textarea id="revText" placeholder="Write your review"></textarea><button class="primary-btn" onclick="addReview()">Submit Review</button></div></article></div>`+markBtn('student')}

function about(){return pageIntro('About the Course','Course, department and creator information for this interactive DSA learning portal.')+`<div class="topic-grid"><article class="topic-card"><h3>Course Information</h3><p><b>Course:</b> Data Structures & Algorithms</p><p><b>Focus:</b> Fundamental data structures, algorithmic thinking, complexity analysis, implementation, visualization and problem solving.</p><p><b>Learning approach:</b> Concepts → diagrams → code → visualization → practice.</p></article><article class="topic-card"><h3>Department Information</h3><p><b>Department:</b> Artificial Intelligence & Data Science</p><p><b>Institute:</b> Annasaheb Dange College of Engineering and Technology, Ashta.</p><p>The portal can be customized with your official department logo, syllabus, course code, academic year and laboratory schedule.</p></article><article class="topic-card"><h3>Creator Information</h3><p><b>Created by:</b> Dr. Asma Shaikh</p><p><b>Role:</b> Head and Professor, Artificial Intelligence and Data Science Department</p><p>This portal is designed as a teaching-learning resource for students studying Data Structures & Algorithms.</p></article><article class="topic-card"><h3>Contact Section</h3><p>Add official institutional email, department webpage, office contact and faculty profile links here before publishing.</p><div class="flow"><span class="flow-box">Student</span><span>→</span><span class="flow-box">DSA Portal</span><span>→</span><span class="flow-box">Department</span><span>→</span><span class="flow-box">Faculty Support</span></div></article></div><div class="footer-card"><h2>Data Structures & Algorithms Learning Hub</h2><p>Learn concepts. Visualize operations. Write programs. Practice consistently.</p><b>Created by Dr. Asma Shaikh, Head and Professor, AI & DS Department</b></div>`}

// ===== Enhanced Linked List Visualizations =====
window.llVizStates={};
function llReset(type){window.llVizStates[type]=[10,20,30,40];renderLLViz(type);let st=document.querySelector(`#${type}Status`);if(st)st.textContent='Reset complete. List = 10, 20, 30, 40.'}
function renderLLViz(type,active=-1,link=-1){let box=document.querySelector(`#${type}Viz`);if(!box)return;if(!window.llVizStates[type])window.llVizStates[type]=[10,20,30,40];let a=window.llVizStates[type];if(!a.length){box.innerHTML='<div class="empty-list">HEAD → NULL (empty list)</div>';return}let parts=[];a.forEach((v,i)=>{let cls='ll-node viz-node'+(i===active?' ll-active':'');if(type==='dll')parts.push(`<div class="${cls}"><span class="ptr prev">${i===0?'NULL':'prev'}</span><span>${v}</span><span class="ptr next">${i===a.length-1?'NULL':'next'}</span></div>`);else parts.push(`<div class="${cls}"><span>${v}</span><span class="ptr next">${type==='cll'&&i===a.length-1?'HEAD':i===a.length-1?'NULL':'next'}</span></div>`);if(i<a.length-1)parts.push(`<span class="arrow ${i===link?'link-change':''}">${type==='dll'?'⇄':'→'}</span>`)});if(type==='cll')parts.push(`<span class="circular-return ${link===a.length-1?'link-change':''}">↺ back to HEAD</span>`);box.innerHTML=`<div class="ll-row">${parts.join('')}</div><div class="head-label">HEAD → position 1</div>`}
async function llOperate(type,op){if(!window.llVizStates[type])window.llVizStates[type]=[10,20,30,40];let a=window.llVizStates[type],status=document.querySelector(`#${type}Status`),value=+document.querySelector(`#${type}Value`).value,pos=Math.floor(+document.querySelector(`#${type}Pos`).value||1);let sleep=ms=>new Promise(r=>setTimeout(r,ms));let typeName=type==='sll'?'Singly':type==='dll'?'Doubly':'Circular';if(op.startsWith('delete')&&!a.length){status.textContent='Deletion not possible: the list is empty.';return}if(op.includes('Pos')&&(pos<1||pos>(op.startsWith('insert')?a.length+1:a.length))){status.textContent=`Invalid position ${pos}. Valid range is 1 to ${op.startsWith('insert')?a.length+1:a.length}.`;return}
let idx=op.endsWith('Begin')?0:op.endsWith('End')?(op.startsWith('insert')?a.length:a.length-1):pos-1;
if(op.startsWith('insert')){status.innerHTML=`<b>${typeName} Linked List:</b> creating new node ${value}.`;renderLLViz(type,Math.max(0,Math.min(idx,a.length-1)));await sleep(600);if(idx===0){status.textContent=type==='cll'?'New node points to old HEAD; last node will be redirected to the new HEAD.':type==='dll'?'new->next = HEAD; old HEAD->prev = new; HEAD = new.':'new->next = HEAD; HEAD = new.'}else if(idx===a.length){status.textContent=type==='cll'?'Traverse to last node; last->next = new and new->next = HEAD.':type==='dll'?'old last->next = new; new->prev = old last; new->next = NULL.':'Traverse to last node; last->next = new; new->next = NULL.'}else{status.textContent=type==='dll'?'Connect new node between previous and current nodes by updating four links.':'previous->next = new; new->next = current.'}await sleep(700);a.splice(idx,0,value);renderLLViz(type,idx,Math.max(0,idx-1));await sleep(700);status.innerHTML=`✓ <b>${op==='insertBegin'?'Insertion at beginning':op==='insertEnd'?'Insertion at end':'Insertion at position '+pos}</b> completed. New list: ${a.join(' → ')}${type==='cll'?' → HEAD':''}.`;renderLLViz(type,idx)}else{renderLLViz(type,idx,Math.max(0,idx-1));status.innerHTML=`<b>${typeName} Linked List:</b> node ${a[idx]} at position ${idx+1} selected for deletion.`;await sleep(700);let removed=a[idx];if(idx===0){status.textContent=type==='cll'&&a.length>1?'Move HEAD to next node and redirect last->next to the new HEAD.':type==='dll'?'HEAD = HEAD->next; new HEAD->prev = NULL.':'HEAD = HEAD->next; free the old first node.'}else if(idx===a.length-1){status.textContent=type==='cll'?'Previous node becomes last and its next pointer is changed to HEAD.':type==='dll'?'Previous node->next = NULL; free the old last node.':'Previous node->next = NULL; free the old last node.'}else{status.textContent=type==='dll'?'previous->next = current->next and next->prev = current->prev, then free current.':'previous->next = current->next, then free current.'}await sleep(700);a.splice(idx,1);renderLLViz(type,Math.min(idx,a.length-1),Math.max(0,idx-1));status.innerHTML=`✓ <b>${op==='deleteBegin'?'Deletion at beginning':op==='deleteEnd'?'Deletion at end':'Deletion at position '+pos}</b> completed. Deleted ${removed}. ${a.length?'New list: '+a.join(' → ')+(type==='cll'?' → HEAD':''):'The list is now empty.'}`}}

// initialize Linked List diagrams when the section is rendered
function initLinkedViz(){['sll','dll','cll'].forEach(t=>{window.llVizStates[t]=[10,20,30,40];renderLLViz(t)})}

// ===== Searching Visualizations =====
function resetSearchViz(type){if(type==='linear'){let b=document.querySelector('#linearSearchArray');if(b)b.innerHTML=[12,25,7,35,18,50,42].map((x,i)=>`<div class="cell" data-v="${x}">${x}<small>${i}</small></div>`).join('');let r=document.querySelector('#linearSearchResult');if(r)r.textContent='Enter a key and start the visualization.'}else{let b=document.querySelector('#searchArray');if(b)b.innerHTML=[10,20,30,40,50,60,70].map((x,i)=>`<div class="cell" data-v="${x}">${x}<small>${i}</small></div>`).join('');let r=document.querySelector('#searchResult');if(r)r.textContent='Enter a key and start the visualization.'}}
window.linearSearchViz=async()=>{let key=+document.querySelector('#linearKey').value,cells=[...document.querySelectorAll('#linearSearchArray .cell')],out=document.querySelector('#linearSearchResult'),sleep=ms=>new Promise(r=>setTimeout(r,ms));for(let i=0;i<cells.length;i++){cells.forEach(c=>c.classList.remove('search-current','search-found'));cells[i].classList.add('search-current');out.innerHTML=`Step ${i+1}: Compare key <b>${key}</b> with A[${i}] = <b>${cells[i].dataset.v}</b>.`;await sleep(650);if(+cells[i].dataset.v===key){cells[i].classList.remove('search-current');cells[i].classList.add('search-found');out.innerHTML=`✓ Key <b>${key}</b> found at index <b>${i}</b> after ${i+1} comparison(s).`;return}}out.innerHTML=`Key <b>${key}</b> not found after checking all ${cells.length} elements.`};
window.binaryViz=async()=>{let key=+document.querySelector('#searchKey').value,cells=[...document.querySelectorAll('#searchArray .cell')],out=document.querySelector('#searchResult'),l=0,h=cells.length-1,step=1,sleep=ms=>new Promise(r=>setTimeout(r,ms));while(l<=h){cells.forEach(c=>c.classList.remove('search-low','search-high','search-mid','search-discard','search-found'));cells.forEach((c,i)=>{if(i<l||i>h)c.classList.add('search-discard')});let m=Math.floor((l+h)/2);cells[l].classList.add('search-low');cells[h].classList.add('search-high');cells[m].classList.add('search-mid');out.innerHTML=`Step ${step}: low=${l}, high=${h}, mid=${m}. Compare <b>${key}</b> with A[${m}] = <b>${cells[m].dataset.v}</b>.`;await sleep(800);let v=+cells[m].dataset.v;if(v===key){cells[m].className='cell search-found';out.innerHTML=`✓ Key <b>${key}</b> found at index <b>${m}</b> in ${step} step(s).`;return}if(key<v){out.innerHTML+=` Key is smaller, so set high = ${m-1}.`;h=m-1}else{out.innerHTML+=` Key is larger, so set low = ${m+1}.`;l=m+1}await sleep(550);step++}out.innerHTML=`Key <b>${key}</b> is not present in the array.`};

// ===== Complete Sorting Visualizations =====
const sortInitial=[42,18,35,9,27,14];
function resetSortViz(type){let box=document.querySelector(`#sort-${type}`);if(box)box.innerHTML=sortInitial.map((x,i)=>`<div class="cell" data-i="${i}">${x}<small>${i}</small></div>`).join('');let s=document.querySelector(`#sort-${type}-status`);if(s)s.textContent='Ready. Click Animate to start.'}
function sortSteps(type,input){let a=[...input],steps=[];const add=(msg,idx=[])=>steps.push({a:[...a],msg,idx:[...idx]});if(type==='bubble'){for(let i=0;i<a.length-1;i++){for(let j=0;j<a.length-1-i;j++){add(`Pass ${i+1}: compare ${a[j]} and ${a[j+1]}.`,[j,j+1]);if(a[j]>a[j+1]){[a[j],a[j+1]]=[a[j+1],a[j]];add(`Swap because ${a[j+1]} > ${a[j]}.`,[j,j+1])}}}}else if(type==='selection'){for(let i=0;i<a.length-1;i++){let min=i;add(`Start pass ${i+1}; current minimum is ${a[min]}.`,[i]);for(let j=i+1;j<a.length;j++){add(`Compare current minimum ${a[min]} with ${a[j]}.`,[min,j]);if(a[j]<a[min]){min=j;add(`New minimum found: ${a[min]}.`,[min])}}if(min!==i){[a[i],a[min]]=[a[min],a[i]];add(`Place minimum ${a[i]} at position ${i}.`,[i,min])}}}else if(type==='insertion'){for(let i=1;i<a.length;i++){let key=a[i],j=i-1;add(`Take key ${key} from position ${i}.`,[i]);while(j>=0&&a[j]>key){a[j+1]=a[j];add(`Shift ${a[j]} one position to the right.`,[j,j+1]);j--}a[j+1]=key;add(`Insert key ${key} at position ${j+1}.`,[j+1])}}else if(type==='merge'){function merge(l,m,r){let left=a.slice(l,m+1),right=a.slice(m+1,r+1),i=0,j=0,k=l;add(`Merge ranges [${l}..${m}] and [${m+1}..${r}].`,Array.from({length:r-l+1},(_,x)=>l+x));while(i<left.length&&j<right.length){a[k++]=left[i]<=right[j]?left[i++]:right[j++];add('Copy the smaller front value into the merged range.',[k-1])}while(i<left.length){a[k++]=left[i++];add('Copy remaining left value.',[k-1])}while(j<right.length){a[k++]=right[j++];add('Copy remaining right value.',[k-1])}}function ms(l,r){if(l>=r)return;let m=Math.floor((l+r)/2);add(`Divide range [${l}..${r}] at middle ${m}.`,[l,m,r]);ms(l,m);ms(m+1,r);merge(l,m,r)}ms(0,a.length-1)}else if(type==='quick'){function part(lo,hi){let pivot=a[hi],i=lo-1;add(`Pivot = ${pivot} at index ${hi}. Partition [${lo}..${hi}].`,[hi]);for(let j=lo;j<hi;j++){add(`Compare ${a[j]} with pivot ${pivot}.`,[j,hi]);if(a[j]<pivot){i++;[a[i],a[j]]=[a[j],a[i]];add(`Move ${a[i]} to the left partition.`,[i,j])}}[a[i+1],a[hi]]=[a[hi],a[i+1]];add(`Place pivot ${pivot} at its correct position ${i+1}.`,[i+1]);return i+1}function qs(lo,hi){if(lo<hi){let p=part(lo,hi);qs(lo,p-1);qs(p+1,hi)}}qs(0,a.length-1)}else if(type==='heap'){function heapify(n,i){let largest=i,l=2*i+1,r=2*i+2;add(`Heapify node at index ${i}.`,[i,...(l<n?[l]:[]),...(r<n?[r]:[])]);if(l<n&&a[l]>a[largest])largest=l;if(r<n&&a[r]>a[largest])largest=r;if(largest!==i){[a[i],a[largest]]=[a[largest],a[i]];add(`Swap ${a[largest]} with larger child ${a[i]}.`,[i,largest]);heapify(n,largest)}}for(let i=Math.floor(a.length/2)-1;i>=0;i--)heapify(a.length,i);for(let end=a.length-1;end>0;end--){[a[0],a[end]]=[a[end],a[0]];add(`Move maximum ${a[end]} from heap root to final position ${end}.`,[0,end]);heapify(end,0)}}add('Sorting complete.',Array.from({length:a.length},(_,i)=>i));return steps}
window.runSortViz=async type=>{resetSortViz(type);let box=document.querySelector(`#sort-${type}`),status=document.querySelector(`#sort-${type}-status`),steps=sortSteps(type,sortInitial),sleep=ms=>new Promise(r=>setTimeout(r,ms));for(let k=0;k<steps.length;k++){let st=steps[k];box.innerHTML=st.a.map((x,i)=>`<div class="cell ${st.idx.includes(i)?'sort-active':''}">${x}<small>${i}</small></div>`).join('');status.innerHTML=`Step ${k+1}/${steps.length}: ${st.msg}`;await sleep(type==='merge'||type==='quick'||type==='heap'?430:380)}status.innerHTML=`✓ <b>${type.charAt(0).toUpperCase()+type.slice(1)} Sort complete:</b> ${steps[steps.length-1].a.join(', ')}`};

const renderers={dashboard:renderDashboard,intro,complexity,arrays,linked,stack,queue,trees,graphs,searching,sorting,recursion,lab,visualization,practice,cheatsheet:cheat,student,about};
function render(id){id=renderers[id]?id:'dashboard';document.querySelectorAll('.nav-btn').forEach(b=>b.classList.toggle('active',b.dataset.page===id));let p=pages.find(x=>x[0]===id);document.querySelector('#pageEyebrow').textContent=id==='dashboard'?'Course Dashboard':'DSA Learning Module';document.querySelector('#pageTitle').textContent=p[1];if(id==='dashboard')renderDashboard();else content.innerHTML=`<div class="fade-in">${renderers[id]()}</div>`;progress();if(id==='visualization')loadViz();if(id==='linked')initLinkedViz();document.querySelector('#sidebar').classList.remove('open');window.scrollTo({top:0,behavior:'smooth'});}
document.addEventListener('click',e=>{let b=e.target.closest('[data-page]');if(b)render(b.dataset.page)});
document.querySelector('#menuToggle').onclick=()=>document.querySelector('#sidebar').classList.toggle('open');document.querySelector('#resetProgress').onclick=()=>{if(confirm('Reset all topic progress?')){localStorage.removeItem('dsaDone');render('dashboard')}};
nav();render('dashboard');
