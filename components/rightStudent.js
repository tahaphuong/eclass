components.studentRightNav = `
<div id="std-info" class="info">
    <div class="classes-list-title">My classes</div>
    <div id="listClass" class="classes-list">
    </div>
    <div class="group-wrapper">
        <div class="add-std" id="add-teacher">
            <input id="add-teacher-input" maxlength="50">
            <span><button id="add-teacher-btn">Add class</button></span>
            <div id="add-teacher-error" class="error-message"></div>
        </div>
        <br>
        <div class="std-info">
            <div>
                <div class="class-info-title hearts-title">Your lives</div>
                <div id="right-hearts" class="hearts"></div>
            </div>
            <div>
                <div class="class-info-title hearts-title">Points</div>
                <div id="right-points" class="right-points"></div>
            </div>
        </div>
        <div class="class-info-wrapper">
            <div class="class-info-title">Class infos:</div>
            <div>Name: <span id="name"></span></div>
            <div>Teacher: <span id="teacherUsername"></span></div>
            <div>Total exercises: <span id="totalHomeworks"></span></div>
            <div>Remaining deadlines: <span id="deadlinesLeft"></span></div>
            <div>Total students: <span id="totalStudents"></span></div><br>
            <a href="#std-list">> classmates and grades</a><br>
        </div>                        
    </div> 
</div>
`;
