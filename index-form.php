<?php include_once('header.php'); ?>

<section class="container-fluid">
	<div class="container" >
		<div class="card" id="login-wrapper" >
			<div class="row" >
				<div class="col-12 col-md-6" >
					<div id="login" >
						<img src="library/img/AAN_logo.webp" alt="Allergy Asthma Network Logo" id="logo" />
						<h1>Welcome to the Asthma Equity Explorer</h1>
						<br/>
						<form id="introFields">
							<div class="fsRowBody fsCell fsFieldCell fsFirst fsLast fsLabelVertical fsSpan100" id="" lang="en" fs-field-type="email" fs-field-validation-name="Email">
								<label id="email_label" class="fsLabel fsRequiredLabel" for="sf_email_address">Email<span class="fsRequiredMarker">*</span></label>											
								<input type="email" id="sf_email_address" name="sf_email_address" size="50" required="required" value="" class="fsField fsFormatEmail fsRequired" aria-required="true">
								<span class="alert-msg" style="display: none;" >Please provide your email address to access the database</span>

								<p>Enter your email address and click "Submit".</p>
								<div class="btn-wrapper">
									<!-- <div  class="radio-btn btn btn-large btn-secondary user-choice-btn" id="new-user" data-bs-toggle="modal" ><span>New User</span></div>
									<div class="radio-btn btn btn-large user-choice-btn" id="returning-user" data-bs-toggle="modal" ><span>Returning User</span></div> -->
                                    <div class="radio-btn btn btn-large btn-secondary submit-btn" id="submitEmail" data-bs-toggle="modal"><span>Submit</span></div>
                                    <div id="result" style="font-weight: 500; font-size: 13px; color: darkred;"></div>
								</div>
							</div>
						</form>
						
						<div id="terms" >
							<p class="text-grey text-center small" >By continuing, you agree to the Allergy & Asthma Network <br/><a href="/terms.php" target="_blank" >Terms and Conditions of Use</a>.</p>
						</div>
					</div>
				</div><!-- .col -->
				<div class="col-12 col-md-6" >
					<div id="instructions" >
					<p class="large" ><strong>Discover the inequities related to community, environmental and other factors for those with asthma by using this free tool to examine those impacts down to the zip code level.</strong></p>

					<p>Using this tool, researchers can conduct analyses of social, economic, and environmental impacts on asthma within the context of geography.</p>

					<p class="large" ><strong>Quick Tips:</strong></p>
					<ul>
						<li>Registration is free to use this tool.</li>
						<li>By registering you will be able to use the database and login in the future to conduct further analyses. You will also be added to our future communications for news and updates from Allergy & Asthma Network.</li>
						<li>Contact us at <a href="mailto:research@allergyasthmanetwork.org" >research@allergyasthmanetwork.org</a> if you have any questions or comments regarding this free tool.</li>
					</ul>
					</div>
				</div><!-- .col -->
			</div><!-- .row -->
		</div><!-- .card -->

		<?php include_once('partials/modal-form.php'); ?>

	</div><!-- .container -->
</section><!-- .container-fluid -->

<div id="hold" style="display: none !important;" ></div>

<?php include_once('footer.php'); ?>