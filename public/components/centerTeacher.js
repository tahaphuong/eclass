components.centerNav = `
<div class="classroom">
    <div id="works"></div>
    {%ADDWORK%}
    {%STUDENTLIST%}
</div>
`;

/* <div id="work1" class="work"></div> */
// {%SUBMISSION%}

components.studentList = `
<div id="std-list" class="work">
    <div class="add-std">
        <input id="add-student-input" name="addStudent" maxLength="50">
        <span><button id="add-student">Add student (email)</button></span>
        <div id="add-student-error" class="error-message"></div>
    </div>
    
    <div class="work-title">STUDENTS IN CLASS</div>
    <div id="listStudents" class="classmates"></div>
</div>
`;

components.work = `
<div id="add-work" class="work add-work">
    <div class="work-title">Add exercise</div>
    <br>
    <form id="add-work-form">
        <div class="add-work-info">
            <div class="add-title-res">Title <input id="addWorkTitle" maxlength="120" autocomplete="off"/></div>
            <div style="display: flex;">Days to finish: 
                <input id="addDeadline" maxlength="2" min="1" max="99" autocomplete="off" />
                <div id="deadline-error" class="error-message"></div>
            </div>
        </div>
        <br>
        <div>Task description</div>
        <div>
            <textarea id="ques" rows="5" cols="60" maxlength="600" name="ques"></textarea><br>
        </div>
        <div>
            <button id="buttonAddWork" type="submit">Add</button>
            <div id="add-work-error" class="error-message"></div>
        </div>
    </form>
</div>
`;
components.submit = `
<div class="work-title">Submission</div>
<div class="submission">
    <div class="student-submission"></div>
</div>
`;

/**
 * <div class="student-email">high@gmail.com</div>
            <div class="created-at">hightothesky tạo lúc 21:20 ngày 17/10/2019</div>
            <div class="student-text">
                Hello, here is some text without a meaning. This text should show, how a printed text will look
                at this place. If you read this text, you will get no information. Really? Is there no information? Is
                there a difference between this text and some nonsense like Huardest gefburn? Kjift – Never mind!
                A blind text like this gives you information about the selected font, how the letters are written and the
                impression of the look. This text should contain all letters of the alphabet and it should be written in of
                the original language. There is no need for a special contents, but the length of words should match to
                the language. Hello, here is some text without a meaning. This text should show, how a printed text will
                look like at this place. If you read this text, you will get no information. Really? Is there no information?
                Is there a difference between this text and some nonsense like Huardest gefburn?
            </div>
            <div class="bar" style="height: 1px; margin-top: 4vh"></div>
            <div class="rate">
                <div class="grade">điểm (/10):<br>
                    <span class="grade-display">9</span>
                    <span class="grade-input"><input/></span>
                </div>
                <div class="work-check">Đánh dấu bài:<br>
                    <span class="work-check-display">NO</span>
                    <span class="work-check-input"><input type="checkbox" checked="false" value="1"></div></span>
                <div class="rating">nhận xét:
                    <span class="rating-display"> Hello, here is some text without a meaning. This text should show, how a printed text will look at this place.</span>
                    <span class="rating-input"><input/></span>
                </div>
                <div class="rate-button">
                    <button class="edit-button">Chỉnh sửa</button>
                    <button class="done-button">Hoàn thành</button>
                </div>
            </div>
 */

/**
  *             <div onclick="workShorten(this)" class="work-title">Đọc bài báo và nêu nhận xét - bài tập ngày thứ 6 <span class="shorten-icon">></span></div>
            <div class="work-detail">Yêu cầu nêu nhận xét 100-200 chữ, link bài báo www.vnexpress.com Yêu cầu nêu nhận xét 100-200 chữ, link bài báo www.vnexpress.com Yêu cầu nêu nhận xét 100-200 chữ, link bài báo www.vnexpress.com Yêu cầu nêu nhận xét 100-200 chữ, link bài báo www.vnexpress.com Yêu cầu nêu nhận xét 100-200 chữ, link bài báo www.vnexpress.com</div>
            <div class="created-at">tạo lúc 21:20 ngày 17/10/2019</div>
            <div class="deadline-display">
                DEADLINE: <span>21:20 ngày 20/10/2019</span>
            </div>
  */
