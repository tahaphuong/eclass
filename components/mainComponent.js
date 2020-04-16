const components = {};

components.loading = `<div class="loading-container">e-class</div>`

components.heading = `
    <div id="heading" class="heading">
        <div></div>
        <div class="heading-title">
            <div class="page-title">e-class</div>
            <div class="leading-text">Forget the deadline? Ya die.</div>
            <div class="bar" style="margin-top: 5vh"></div>
        </div>
        <div></div>
        <div class="sign-in-button">
            <button id="signIn"><a href="#sign-in">> Login now!</a></button>
        </div>
    </div>
`;

components.footer = `
    <div class="footer">
        <div><button><a href="#heading">Back to home</a></button></div>
        <div><button><a>về chúng tôi</a></button></div>
    </div>
`;

components.section = `
    <section class="bg">
        <div class="welcome-page">
            <div></div>
            <div class="welcome-page-content">
                {%COMPONENT%}
            </div>
        </div>
    </section>
`;

components.mainHome = `
    <div class="main">
        <div class="hello">
            <div id="nav-icon" onclick="showNav()" class="left-nav-icon">
                <div class="nav-icon-bar"></div>
                <div class="nav-icon-bar"></div>
            </div>
            <div class="sign-up-title">e-class</div>
        </div>
        <div id="mainHome" class="main-content">{%HOME%}</div>
    </div>
`;
