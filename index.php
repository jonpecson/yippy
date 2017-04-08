<?php include('includes/header.php') ?>

<div id="loadingScreen" v-if="visible">
	<div class="z-slide-wrap top" id="slider1">
		<ul class="z-slide-content">
			<li v-for="item in explanations" class="z-slide-item" v-bind:style="item.background">
      			<div class="content">
					<h2>{{ item.title }}</h2>
					<span v-bind:class="item.icon"></span>
					<p>{{ item.sub_title }}</p>
				</div>

				<a href="#" v-if="item.rev_title == false" v-on:click.prevent="skip" class="skip">Skip</a>
				<a href="#" v-if="item.rev_title == true"  v-on:click.prevent="skip" class="start-button">Let' start</a>
			</li>
    	</ul>
	</div>
</div>

<div id="signUp" v-if="visible">
	<div id="onBoarding" class="panel" v-if="step == 1">
		<div id="companyLogo"></div>
		<div class="bottom-area">
			<a href="javascript:void(0);" v-on:click.prevent="showSignupForm" class="button-big">Sign up</a>
			<a href="javascript:void(0);" v-on:click.prevent="showLoginForm">I already have an account</a>
		</div>
	</div>
	
	<div id="login" class="panel" v-else-if="step == 2">
		<div class="titleBar"><a href="javascript:void(0);" v-on:click="back" class="back"></a> Log in</div>
		<form action="" method="post" class="middle-area full">
			<div class="placer middle">
				<input type="email" placeholder="E-mailadres" v-model="email">
				<input type="password" placeholder="Wachtwoord" v-model="password">
			</div>
			<div class="bottom-area">
				<button class="form-button-medium">Login</button>
				<a href="javascript:void(0);" v-on:click="showSignupForm" >I don't have an account</a>
				<br>
				<a href="javascript:void(0);" v-on:click="showResetForm">Forgot password</a>
			</div>
		</form>
	</div>
			
	<div id="reset" class="panel" v-else-if="step == 3">
	
		<div class="titleBar"><a href="javascript:void(0);" v-on:click="back" class="back"></a> Reset password</div>

		<form action="" method="post" class="middle-area full">

			<div class="placer bottom">
				<p>We will send you an email with a link so you can set up a new password</p>

				<input type="email" placeholder="E-mailadres">
			</div>
				
				<div class="bottom-area">
					<button class="form-button-medium">Reset</button>
				</div>
				
		</form>
	
	</div>	
	
	<div id="renew" class="panel" v-else-if="step == 4">
	
		<div class="titleBar"><a href="javascript:void(0);" v-on:click="back" class="back"></a> Reset password</div>

		<form action="" method="post" class="middle-area full">
		
			<div class="placer middle">
				<input type="password" placeholder="New password">
				<input type="password" placeholder="Repeat password">
			</div>
			
			<div class="bottom-area">
				<button class="form-button-medium">Confirm</button>
			</div>
			
		</form>

	</div>	
	
	<div id="parent" class="panel" v-else-if="step == 5">

		<div class="titleBar"><a href="javascript:void(0);" v-on:click="back" class="back"></a> Sign up parent</div>
		
		<form action="" method="post" class="middle-area semi" v-on:submit="register">
		
			<div class="selection-group">
				<input type="radio" id="father"  name="parents" v-model="signup.parent_gender">
				<label for="father" class="rLeft">Father</label>
				<input type="radio" id="mother"  name="parents" v-model="signup.parent_gender">
				<label for="mother" class="rRight">Mother</label>
			</div>

			<div class="placer bottom">
		
				<label>Naam</label>
				<input type="text" placeholder="your name" v-model="signup.parent_name">

				<label>E-mailadres</label>
				<input type="email" placeholder="name@mail.nl" v-model="signup.parent_email">

				<label>Wachwoord</label>
				<input type="password" placeholder="******" v-model="signup.parent_password">
			
			</div>
			
			<div class="bottom-area">
				<input type="submit" class="form-button-medium" value="Next">
			</div>
			
		</form>

	</div>

	<div id="child" class="panel" v-else-if="step == 6">

		<div class="titleBar"><a href="javascript:void(0);" v-on:click="back" class="back"></a> Sign up child</div>
		
		<form action="" method="post" class="middle-area semi">
		
			<div class="selection-group">
				<input type="radio" id="son"  name="child" v-model="signup.child_gender">
				<label for="son" class="rLeft">Son</label>
				<input type="radio" id="daughter"  name="child" v-model="signup.child_gender">
				<label for="daughter" class="rRight">Daughter</label>
			</div>

			<div class="placer middle">
			
				<label>Naam van jouw kind</label>
				<input type="text" placeholder="your name" v-model="signup.child_name">

				<label>Wanneer is jouw kind geboren?</label>
				<ul id="date-group">
					<li><input type="tel" placeholder="DD" class="date-group" v-model="signup.child_bday_d"></li>
					<li><input type="tel" placeholder="MM" class="date-group" v-model="signup.child_bday_m"></li> 
					<li><input type="tel" placeholder="YYYY" class="date-group" v-model="signup.child_bday_y"></li>
				</ul>
			
			</div>
			
			<div class="bottom-area">
				<button class="form-button-medium">Next</button>
			</div>
			
		</form>


	</div>
	
	<div id="photo" class="panel" v-else-if="step == 7">

		<div class="titleBar"><a href="javascript:void(0);" v-on:click="back" class="back"></a> Add photo</div>

		<form action="" method="post" enctype="multipart/form-data">

			<input type="file" name="uploadedfile" id="uploadPic" accept="image/*" capture>
			<label for="uploadPic" class="uploadPic">+</label>

			<h3>Choose a nice picture of <br> you and [name child]!</h3>

			<div class="bottom-area">
				<input type="submit" value="next" class="form-button-medium">
				<a href="javascript:void(0);">Continue without picture</a>
			</div>
			
		</form>

	</div>
						
	<div id="photoAdded" class="panel" v-else-if="step == 8">

		<div class="titleBar"><a href="javascript:void(0);" v-on:click="back" class="back"></a> Add photo</div>

		<div class="picHolder"></div>
			
		<h3>What a nice picture! <br> Do you also like?</h3>
		<a href="javascript:void(0);">Choose another picture</a>

		<div class="bottom-area">
			<a href="javascript:void(0);" class="button-medium">next</a>
		</div>
		

	</div>
	
	<div id="starten" class="panel" v-else-if="step == 9">
				
			<div class="placer middle">
						
				<p>Become a Supermom for <span>Lisa</span> with <strong>Yipp app!</strong></p>		
						
			</div> 							
			
			<div class="bottom-area">
				<a href="javascript:void(0);" class="button-medium white">Begin!</a>
			</div>
							
	</div>
								
</div></div>

<?php include('includes/footer.php') ?>