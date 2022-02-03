class Block{
    constructor(timestamp, teacher, subject, mark, student, previousHash = ''){
        this.timestamp = timestamp;
        this.teacher = teacher;
        this.subject = subject;
        this.mark = mark;
        this.student = student;
        this.previousHash = previousHash;
        this.nonce = 0;
        this.hash = this.calculateHash();
    }

    calculateHash() {
        return CryptoJS.SHA256(this.previousHash + this.timestamp + this.teacher + this.subject + this.mark + this.student + this.nonce).toString(CryptoJS.enc.Hex);
    }
}

// Tworzenie bloków
// const createForm = document.querySelector('#create-form');
// createForm.addEventListener('submit', (e) => {

//                     const dt = new Date();
//                     const date = dt.getDate() + "/" + (dt.getMonth() + 1) + "/" + dt.getFullYear() + " - " + (dt.getHours()) + ":" + (dt.getMinutes()) + ":" + (dt.getSeconds());
//                     const timestamp = Date.now();
//                     const blockTimestamp = date + " (" + timestamp + ")";
//                     const blockTeacher = JSON.parse(sessionStorage.getItem("user"));

//                     // const blockTimestamp = "01/01/2021 - 00:00:00" + " (" + timestamp + ")";
//                     // const blockTeacher = "GENESIS";
//                     // const blockPrevHash = 0;

//                     const blockPrevHash = JSON.parse(sessionStorage.getItem("lastHash"));
//                     const blockSubject = createForm.blockSubject.value;
//                     const blockMark = createForm.blockMark.value;
//                     const blockGroup = createForm.blockGroup.value;
//                     const blockStudent = createForm.blockStudent.value;
//                     const blockNote = createForm.blockNote.value;

//                     const block = new Block(blockTimestamp,blockTeacher,blockSubject,blockMark,blockStudent,blockPrevHash);
//                     const blockHash = block.hash;

//                     // Funkcja sprawdzajaca przed dodaniem kolejnego bloku czy prevhash==curhash
//                     // sortowanie wedlug daty i pobieranie kolejno wszystkich danych od poczatku
//                     // sprawdzanie czy utworzony hash jest rowny z wartoscia prevhash z glownego lancucha
//                     // jezeli prawda oznacza ze dane sie zgadzaja, nie wprowadzono zadnych edycji
//                     // rozpoczynamy od Genesis czy Genesis hash == prevHash nastepnego bloku
//                     // dlugosc petli == block.length-1, przed ostatni blok hash == prevhash ostatniego, koniec
//                     // jesli poprawnie przeszlo wszystkie bloki pozwala stworzyc kolejny 
                    
//                     db.collection('block').get().then(doc => {
//                         const data = doc.docs;
//                         let timestamp2 = [];
//                         let sortTimestamp = [];
//                         let time = "";
            
//                         data.forEach(element => {
//                             const ts = element.data().timestamp;
//                             const split1 = ts.split("(");
//                             const cut = split1[1];
//                             const split2 = cut.split(")");
//                             timestamp2.push(split2[0]);
//                             sortTimestamp = timestamp2.sort();
//                         });
                        
//                         let x = sortTimestamp.length-1;


//                         data.forEach(ele => {
//                             data.forEach(el => {
//                                 const ts = el.data().timestamp;
//                                 const split1 = ts.split("(");
//                                 const cut = split1[1];
//                                 const split2 = cut.split(")");
//                                 time = split2[0];
//                                 let checkBlockTimestamp = ts;
//                                 let checkBlockTeacher = el.data().teacher;
//                                 let checkBlockSubject = el.data().subject;
//                                 let checkBlockMark = el.data().mark;
//                                 let checkBlockStudent = el.data().student;
//                                 let checkPrevHash = el.data().previousHash;
//                                 let checkHash = el.data().hash;


//                                 if(sortTimestamp[x] == time) 
//                                 {  
//                                     let checkBlock = new Block(checkBlockTimestamp,checkBlockTeacher,checkBlockSubject,checkBlockMark,checkBlockStudent,checkPrevHash);
//                                     let checkBlockHash = checkBlock.hash;

//                                     if(time == '1637262639079')
//                                     {
//                                         checkBlockHash = "9a151b387c907e4549c74e569899688c621f695deb87e077bf5d96903de62e41";
//                                     }
//                                     if(checkBlockHash == checkHash)
//                                     {
//                                         if(time != '1637262639079')
//                                         {
//                                             x-=1;
//                                         }
//                                     }
//                                 }
//                             }); 

//                             if(x==0)
//                             {
//                                 let isCorrect = true;
//                                 sessionStorage.setItem("isCorrect",JSON.stringify(isCorrect));
//                             }

//                         });

//                         // kazdy element sortTimestamp i pobieramy prevhash od bloku po genesis do ostatniego
//                         // rownoczesnie przechodzimy kazdy blok po kolei posortowany i sprawdzamy hash z tym wyzej prevhash, najlepiej pobierac wszystkie dane od poczatku i tworzyc nowy hash tak jak przy dodawaniu bloku
//                     });


//                     if(JSON.parse(sessionStorage.getItem("isCorrect")))
//                     { 
//                         e.preventDefault();

//                         if(blockSubject == "")
//                         {
//                             //createForm.querySelector('.error').innerHTML = 'Uzupełnij wszystkie dane';
//                             document.getElementById('createAlert').innerHTML = "Uzupełnij wszystkie dane";
//                         }
//                         else if(blockMark == "")
//                         {
//                             document.getElementById('createAlert').innerHTML = "Uzupełnij wszystkie dane";
//                         }
//                         else if(blockGroup == "")
//                         {
//                             document.getElementById('createAlert').innerHTML = "Uzupełnij wszystkie dane";
//                         }
//                         else if(blockStudent == "")
//                         {
//                             document.getElementById('createAlert').innerHTML = "Uzupełnij wszystkie dane";
//                         }
//                         else
//                         {
//                             db.collection('hashes').doc('hash-collection').update({
//                                 collection: firebase.firestore.FieldValue.arrayUnion(blockHash)
//                         });

                        
//                         db.collection('block').doc(blockHash).set({
//                             hash: blockHash,
//                             previousHash: blockPrevHash,
//                             timestamp: blockTimestamp,
//                             teacher: blockTeacher,
//                             subject: blockSubject,
//                             mark: blockMark,
//                             group: blockGroup,
//                             student: blockStudent,
//                             note: blockNote,
//                             key: 0
    
//                             // hash: blockHash,
//                             // previousHash: blockPrevHash,
//                             // timestamp: blockTimestamp,
//                             // teacher: "KONRAD",//blockTeacher,
//                             // subject: null ,//blockSubject,
//                             // mark: 0, //blockMark,
//                             // group: null, //blockGroup,
//                             // student: null, //blockStudent,
//                             // note: null, //blockNote,
//                             // key: 0

//                         }).then(() => {
//                         // Zamknij okno tworzenia i resetuj formularz
//                         const modal = document.querySelector('#modal-create');
//                         M.Modal.getInstance(modal).close();
//                         createForm.reset();
//                         }).catch(err => {
//                             console.log(err.message);
//                         });
    
//                         db.collection('users').get().then(doc => {
    
//                             doc.forEach(element => {
//                                 const checkName = element.data().name;
//                                 const checkSurname = element.data().surname;
//                                 const checkData = checkName + " " + checkSurname;
    
//                                 if(checkData == blockStudent)
//                                 {
//                                     db.collection('block').doc(blockHash).update({
//                                         key: element.data().key
//                                     });
//                                 }
//                             });
//                         });
//                     }

//                     }
//                     else
//                     {
//                         alert("Wystąpił błąd podczas tworzenia łańcucha bloków. Prawdopodobnie dane w łańcuchu zostały sfałszowane.");
//                     }
                    
// });