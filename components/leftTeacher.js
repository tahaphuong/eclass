components.leftNav = `
<div id="nav-responsive" class="nav">
    <div class="students-list-title">navigation</div>
    <div class="display-profile">
        <div><img src="https://ioffice.tatthanh.com.vn/pic/news/images/profile-ca-nha-la-gi(1).png" width="100"></div>
        <div id="display-name" class="display-name"></div>
        <div id="display-email" class="role"></div>
        <div class="role">Teacher</div>
    </div>
    <div id="classes"><button><a href="#works">Classroom</a></button></div>
    <div id="classes-res"><button onclick="hideNav()"><a href="#works">Classroom</a></button></div>
    <div id="classes-info"><button onclick="hideNav()"><a href="#te-info">Class infos</a></button></div> 
    <div id="link-responsive">
        <a href="#std-list" onclick="hideNav()">> students and grades</a><br>
        <a href="#add-work" onclick="hideNav()">> create a new exercise</a>
    </div>
    <div id="log-out"><button><a>log out</a></button></div>
</div>
`;
