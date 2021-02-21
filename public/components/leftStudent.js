components.studentLeftNav = `
<div id="nav-responsive" class="nav">
    <div class="students-list-title">Navigation</div>
    <div class="display-profile">
        <div><img src="../img/std.png" width="100"></div>
        <div id="display-name" class="display-name"></div>
        <div id="display-email" class="role"></div>
        <div class="role">Student</div>
    </div>
    <div id="classes"><button><a href="#works">Classroom</a></button></div>
    <div id="classes-res"><button onclick="hideNav()"><a href="#works">classroom</a></button></div>
    <div id="classes-info"><button onclick="hideNav()"><a href="#std-info">class infos</a></button></div> 
    <div id="link-responsive">
        <a href="#std-list" onclick="hideNav()">> classmates and grades</a><br>
    </div>
    <div id="log-out"><button><a>Log out</a></button></div>
</div>
`;
