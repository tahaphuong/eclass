// show danh sách bài tập + bai nop + nhan xet (ở khu vực giữa)
views.showCurrentClassHomeworksList = () => {
    if(model.currentClassHomeworks && model.currentClassInfo) {
        let checkList = []
        console.log('start', model.currentClassInfo.teacherEmail, checkList)
        let email = firebase.auth().currentUser.email 
        let works = document.getElementById('works') 
        works.innerHTML = '' 

        // lấy từng bài tập của lớp hiện tại 
        for (let hw of model.currentClassHomeworks) {
            let cAread = new Date(hw.createdAt).toLocaleString("en-GB", {dateStyle: "long"})
            let dlread = new Date(hw.deadline).toLocaleString("en-GB", {dateStyle: "medium"})

            let html = `
                <div id="work-${hw.createdAt}" class="work">
                    <div onclick="workShorten(this)" class="work-title"><span id="work-title-${hw.createdAt}"></span><span class="shorten-icon"> ></span></div>
                    <div id="work-content-${hw.createdAt}" class="work-detail"></div>
                    <div class="created-at">created on ${cAread}</div>
                    <div class="deadline-display"><span class="dlread">DEADLINE:</span> <span>${dlread}</span></div>
                    <div id="submission-title" class="work-title">SUBMISSION</div>
                    <div id="f-${hw.createdAt}" class="submission"></div>
                    <div id="a-${hw.createdAt}" class="submission"></div>
                </div>
            `        
        works.innerHTML += html
        document.getElementById("work-content-" + hw.createdAt).innerText = hw.content
        document.getElementById("work-title-" + hw.createdAt).innerText = hw.title

        let formAs = document.getElementById('f-'+hw.createdAt) 

        // cho HS: check user có đúng học sinh trong lop ko (hàm check ở dưới cùng) thì thêm form add bài tập
        if (email != model.currentClassInfo.teacherEmail) {
            let formId = 'form-' + hw.createdAt + '-' + email
            let inputId = 'as-' + hw.createdAt + '-' + email
            let errorId = 'error-' + hw.createdAt + '-' + email

            // cho HS: form để add bài nộp với các id riêng biệt
            let b = `
            <div class="student-submission">
                <div class="student-email">${email}</div>
                <div class="student-text">
                <div class="created-at">You can only edit your submission before deadline.</div>
                    <textarea id="${inputId}" rows="6" cols="60" maxlength="1500" name="ques"></textarea>
                    <br>
                    <div><button id="${formId}" onclick="formAddAsHandler('${inputId}','${hw.deadline}', '${hw.createdAt}', '${email}', '${model.currentClassInfo.teacherEmail}', '${errorId}')" type="button">Submit</button></div>
                <br>
                <div id="${errorId}" class="error-message"></div>
                </div>
            </div>                    
            ` 
            formAs.innerHTML += b 
        }
            views.showAssignments(hw, email, checkList)
        } // kết thúc for chạy từng bài tập của giáo viên
        if ((checkList.length != 0) && (email != model.currentClassInfo.teacherEmail)) {controllers.loser(email, checkList, model.currentClassInfo.teacherEmail)}
        console.log('end', checkList)
    } else {console.log('homeworks and/or class info not available. Check again')}
}

// CHẠY FOR từng phần tử trong mục BÀI NỘP của mỗi bài tập (hw) (2 vòng for lồng nhau)
views.showAssignments = (hw, email, checkList) => {
    if (hw.assignments) {
        let check = null
        let submissions = document.getElementById('a-'+hw.createdAt) 
        submissions.innerHTML = ''
        for (let as of hw.assignments) { 
            check = false
            let asStd = hw.createdAt + '-' + as.email 
            let sAread = new Date(as.submittedAt).toLocaleString("en-GB", {dateStyle: "long"}) 
    
            let a = `
            <div class="student-submission">
                <div class="student-email" onclick="asShorten(this)">${as.email}</div>
                <div class="created-at">created on ${sAread}</div>
                <div class="student-text" id="content-as-${asStd}"></div>
                <div class="bar" style="height: 1px; margin-top: 4vh"></div>
                <div>
                    <div class="rate">
                        <div class="grade">Points:<br>
                            <div class="grade-display">${as.points}</div>
                        </div>

                        <div class="rating"><span>Evaluation:</span>
                            <div class="rating-display" id="rating-${asStd}"></div>
                        </div>

                        <div class="edit-rate-button-wrapper">
                            <button id='btn-${asStd}' onclick="buttonAddRateHandler(this, 'rate-error-${asStd}')"><div class="edit-rate-button-icon"></div></button>
                        </div>
                    </div>
                    <div id="r-${asStd}" class="rate-form"></div>
                </div> 
            </div>`

            let r = `
                <div class="grade" style="border-right: none">Points:<br>
                    <div class="grade-input-wrapper"><input id="add-points-${asStd}" maxlength="2"/></div>
                </div>

                <div class="rating">
                    <span>nhận xét:</span>
                    <div class="rating-input-wrapper"><input id="add-rating-${asStd}" maxlength="300"/></div>
                    <span class="error-message" id="rate-error-${asStd}"></span>
                </div>

                <div class="edit-rate-button-wrapper edit-rate-padding">
                    <button class="cancel-rate-button" onclick="buttonDoneRateHandler(this)">cancel</button>
                    <button class="done-rate-button" onclick="formAddRateHandler(Number(${as.points}), 'add-points-${asStd}', 'add-rating-${asStd}', '${hw.createdAt}', '${as.email}', '${model.currentClassInfo.teacherEmail}', 'rate-error-${asStd}', this)" type="button">Send</button>
                </div>`


            if (model.currentClassInfo.teacherEmail && email == model.currentClassInfo.teacherEmail) {
                submissions.innerHTML += a
                let formRate = document.getElementById('r-'+ asStd) // cho GV: ô để add nhận xét
                formRate.innerHTML += r

                // add only Text, not html
                document.getElementById("content-as-" + asStd).innerText = as.content
                document.getElementById("rating-" + asStd).innerText = as.rating
            }  else {console.log('You are not a teacher. If you are, please check backend again')}

            if (email == as.email) {
                check = true
                submissions.innerHTML = a
                // phải là dấu bằng => nếu ko sẽ bị lặp n^2 (có 2 vòng for)

                // nếu là HS xóa nút chỉnh sửa
                let btn = document.getElementById('btn-'+ asStd)
                btn.style.display = 'none'
                
                document.getElementById("content-as-" + asStd).innerText = as.content
                document.getElementById("rating-" +asStd).innerText = as.rating

                break;
            }
            console.log(check)
        } // kết thúc vòng for chạy từng bài nộp CỦA 1 BÀI TẬP của học sinh 
        if ((email != model.currentClassInfo.teacherEmail) && (check == false) && (hw.deadline < new Date().toISOString())) {
            for (let std of model.currentClassInfo.students) {
                if ((std.email == email) && (!std.inClassAt || std.inClassAt < hw.deadline)) {console.log('yes'); checkList.push(check)}
                console.log(std)
            }
        }
    } else {console.log('can not find the assignments array')} // kết thúc if để check xem hw.assignments có tồn tại không   
}


// cho HS: form nộp/chỉnh sửa bài nộp // as(content), deadline, studentEmail, teacherEmail, error id
function formAddAsHandler(a, dl, cA, stdE, tE, errorId) {
    let submittedAt = new Date().toISOString()
    let as = document.getElementById(a).value.trim()
    
    if (submittedAt <= dl) {
        let check = views.validate(as, validators.require, errorId, 'Please fill all fields')
        if (check) {

            let assign = {
            email: stdE,
            content: String(as),
            submittedAt: submittedAt,
            points: '',
            rating: ''
            }

            controllers.addAs(assign, tE, cA);
            views.clearInput(a)
        }
    } else {
        views.setText(errorId, 'You can not submit because the deadline has passed!')
    }
}

// cho GV: lấy các giá trị de add nhan xet // points, rating, studentEmail, teacherEmail, error id
function formAddRateHandler(oldP, p, r, cA, stdE, tE, errorId, x) {
    let points = document.getElementById(p).value.trim()
    let rating = document.getElementById(r).value.trim()
    console.log(points, rating)
    let check = [views.validate(points, validators.require, errorId, 'Please fill all fields!'),
                views.validate(rating, validators.require, errorId, 'Please fill all fields!')]
    let checkPoints = (points >= 0 && points <= 10)

    if (!check.includes(false)) {
        if (checkPoints) {
            console.log('validate inputs')
            // truyền giá trị vào database
            controllers.addRate(oldP, Number(points), rating, stdE, tE, cA) 
            views.clearInput(p)   
            views.clearInput(r)
            buttonDoneRateHandler(x)            
        } else {views.setText(errorId, 'The scale is 0-10')}
    } else {views.setText(errorId, 'Please fill all fields!!')}          
}

// hien thi danh sach hoc sinh
views.showListStudent = listStudent => {
    let listStudentHtml = document.getElementById('listStudents');
        
    if (listStudent) {
        listStudentHtml.innerHTML = '';
        for (let i = 0; i < listStudent.length; i++) {
            let hearts = listStudent[i].hearts
            if (listStudent[i].hearts <= 0) {hearts = 'dead'}
            let html = `
                <div class="classmate">
                    <div class="classsmate-index">${i + 1}</div>
                    <div class="classmate-email">${listStudent[i].email}</div>
                    <div class="classmate-points">${listStudent[i].points}</div>
                    <div class="classmate-hearts">${hearts}</div>
                </div>
            `;
            
            // display mạng và điểm
            if (listStudent[i].email == firebase.auth().currentUser.email) {
                let yourHearts = document.getElementById('right-hearts')
                let yourPoints = document.getElementById('right-points')
                let heartpic = `<img src="./img/heart.png"></img>`
                // display points
                yourPoints.innerHTML = listStudent[i].points
                // display hearts
                yourHearts.innerHTML = ''
                if (hearts>0) {
                    for (let j=1; j<=hearts; j++) {
                        yourHearts.innerHTML += heartpic
                    }
                } else {yourHearts.innerHTML = 'dead'}
                
			}
        listStudentHtml.innerHTML += html;
	    }
    } else {listStudentHtml.innerText = 'There are no students!'} 
	
};

views.showListClassOfAStudent = stdInfo => {
    let listClassHtml = document.getElementById('listClass');
    listClassHtml.innerHTML = '';
    let listClass = stdInfo.classes;

    for (let i = 0; i < listClass.length; i++) {
        listClassHtml.innerHTML += `
            <div><button class="class" id="${stdInfo.classes[i]}" onclick="reply()">${stdInfo.classes[i]}</button></div>
        `;
    }
};
function reply() {
    let emailStudent = firebase.auth().currentUser.email;
    controllers.loadClassesAndStudent(emailStudent, event.srcElement.id);
}