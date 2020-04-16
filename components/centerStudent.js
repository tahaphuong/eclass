components.studentCenterNav = `
<div class="classroom">
    <div id="works"></div>
    {%STUDENTSTUDENTLIST%}
</div>
`;

components.studentStudentList = `
<div id="std-list" class="work">
    <div class="work-title">Your classmates</div>
    <div id="listStudents" class="classmates"></div>
</div>
`;

components.studentSubmit = `
<div class="work-title">SUBMIT</div>
<div class="submission">
    <div class="student-submission">
        <div class="student-email">high@gmail.com</div>
        <div class="created-at">hightothesky</div>
        <div class="student-text">
            <form>
                <textarea id="submit" rows="5" cols="60" maxlength="1000" name="ques"></textarea><br>
            </form>
            <input class="file-upload" type="file">
            <br>
            <div><button>Submit</button></div>
        </div>
        <div class="bar"></div>

        
        <!-- <div class="rate">
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
        </div>-->
    </div>
</div>
`;
