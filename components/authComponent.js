components.signIn = `
    <div id="sign-in" class="sign-in">
    <div class="sign-up-heading">
        <div class="sign-up-title">Welcome back to e-class!</div>
        <div class="sign-up-leading">Get ready to get back to work!</div>
    </div>
        <form id="sign-in-form" class="sign-up-form">
            <div class="input-wrapper">
                <input placeholder="email" name="email" type="email" maxlength="50"></br> 
                <div id="email-error" class="error-message"></div>
            </div>
            <div class="input-wrapper">
                <input placeholder="password" name="password" type="password"></br>
                <div id="password-error" class="error-message"></div>
            </div>
            <div class="button-wrapper">
                <button id="sign-in-btn" type="submit">Login ></button>
                <span id="sign-in-error" class="error-message"></span>
                <span id="sign-in-success" class="success-message"></span>
                </br>
                <button id="link-to-sign-up"><a href="#sign-up">> Don't have an account?</a></button>
            </div>
        </form>
    </div>
`;

components.signUp = `
    <div id="sign-up" class="sign-up">
        <div class="sign-up-heading">
            <div class="sign-up-title">Sign-up e-class</div>
            <div class="sign-up-leading">Forget the deadline? You die.</div>
        </div>
        <form id="sign-up-form" class="sign-up-form"> 
            <div class="input-wrapper">
                <input placeholder="username" name="username" type="text" maxlength="20"></br>
                <div id="username-error" class="error-message"></div>
            </div>
            
            <!-- radio button ĐỂ CHIA ROLE GV - HS -->
            <!-- <div class="radio-input-wrapper">
                <label>Bạn là: </label>
                <label class="ra-btn">
                    <input id="std-role" type="radio" name="role" value="std">
                    <span class="checkmark"></span><span>Học sinh</span>
                </label>
                <label class="ra-btn">
                    <input id="te-role" type="radio" name="role" value="te">
                    <span class="checkmark"></span><span>Giáo viên</span>
                </label>
                <div id="role-radio-error" class="error-message"></div>
            </div> -->
            
            <div class="input-wrapper">
                <input placeholder="email" name="email" type="email" maxlength="50"></br>
                <div id="email-error" class="error-message"></div>
            </div>
            <div class="input-wrapper">
                <input placeholder="password" name="password" type="password"></br>
                <div id="password-error" class="error-message"></div>
            </div>
            <div class="input-wrapper">
                <input placeholder="Confirm password" name="confirmPassword" type="password"></br>
                <div id="confirm-password-error" class="error-message"></div>
            </div>
            <div class="button-wrapper">
                <button id="sign-up-btn" type="submit">Sign up ></button>
                <span id="sign-up-error" class="error-message"></span>
                <span id="sign-up-success" class="success-message"></span>
                </br>
                <button id="link-to-sign-in"><a href="#sign-in">> You have an account?</a></button>
            </div>
        </form>
    </div>
`;
