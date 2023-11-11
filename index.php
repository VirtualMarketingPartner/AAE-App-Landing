<?php include_once('header.php'); ?>

<section class="container-fluid" >
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

																																<label id="email_label" class="fsLabel fsRequiredLabel" for="email_address">Email<span class="fsRequiredMarker">*</span></label>						

													
								<input type="email" id="email_address" name="email_address" size="50" required="required" value="" class="fsField fsFormatEmail fsRequired" aria-required="true">
							</div>
						</form>
						
						<div id="terms" >
							<p class="text-grey text-center small" >By continuing, you agree to the Allergy & Asthma Network <br/><a href="/terms.php" target="_blank" >Terms and Conditions of Use</a>.</p>
						</div>
					</div>
				</div><!-- .col -->
				<div class="col-12 col-md-6" >
					<div id="instructions" >
						<h2>Questions?</h2>
						<p>Contact us at <a href="mailto:research@allergyasthmanetwork.org" >research@allergyasthmanetwork.org</a> if you have any questions or comments. Any correspondences from Allergy & Asthma Network to you will be from this email address. Please check your junk folders to make sure you don't miss anything from us.</p>
						
						<br/>

						<h4>Stay Informed</h4>
						<p>Consider joining Allergy & Asthma Network's research e-newsletter list to stay connected and learn about research in the pipeline. <a href="https://allergyasthmanetwork.org/research/get-involved-with-research/" target="_blank" >Click here to subscribe</a>.</p>
					</div>
				</div><!-- .col -->
			</div><!-- .row -->
		</div><!-- .card -->

		<?php include_once('partials/modal-form.php'); ?>

		

	</div><!-- .container -->
</section><!-- .container-fluid -->

<?php include_once('footer.php'); ?>