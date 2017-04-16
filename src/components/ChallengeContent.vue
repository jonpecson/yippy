<template>
	<div >
	
		<div class="header">
		
			<router-link :to="{ name: 'challenge'}" class="icon">
				<i class=" icon-yipp_back"></i>
			</router-link>

			<div class="title">Challenge Details</div>
		
		</div>
		
		<div class="wrap">
		
			<div class="details">
			
			<span class="set">
					<i class="icon-yipp_notification_line"></i>
					14:00
					| <i class="icon-yipp_repeat_line"></i>
					Every day
					</span>
				
				<table width="100%" border="0">
					<tbody>
						<tr>
							<td>
								<p>Eating more vegetable</p>
								<p>1. Broco</p>
							</td>
							<td>
							<a href="" class="edit"><i class="icon-yipp_pencil_line"></i></a>
							</td>
						</tr>
					</tbody>
				</table>
				
			</div>
		
		</div>
	
		<div class="steps">
	
				<ul>
					<li>1</li>
					<li>2</li>
					<li>3</li>
					<li>4</li>
					<li>5</li>
				</ul>

			<hr>
		
		</div>
		
		<div class="pic" style="background-image: url(assets/img/slider-1.jpg);">
		
		</div>
	
		<h4>Evaluation</h4>
		
		<textarea></textarea>
		
		<ul class="selection">
			<li><a href=""><i class="icon-yipp_emoticon_sad"></i></a></li>
			<li><a href="" class="active"><i class="icon-yipp_emoticon_neutral"></i></a></li>
			<li><a href=""><i class="icon-yipp_emoticon_happy-"></i></a></li>
		</ul>
		
		<h4>Notes</h4>
		
		<textarea></textarea>
		
		<a href="" class="btn">Done</a>
	
	</div>
	
	<section class="resultCard">
		
		<i class="icon-yipp_check_full"></i>
		
		<h3>You can do it!</h3>
		<p>We made a beautiful photo collage of this week check it out!</p>
		
		<div class="bottom">
		<a href="javascript:void(0);" class="btn mid">See result</a>

		<a href="javascript:void(0);" class="btn big">Restart challenge</a>
		
		</div>
	
		<div id="modal">

			<div id="msg">

				<h3>Are you sure?</h3>

				<p>Do you want to restart challenge?</p>

				<a href="javascript:void(0);">Restart challenge</a>

			</div>

		</div>

	</section>
	
	<section id="collage">
	
		<div class="header">
			<a href="">X</a> Photo Collage
			<h3>Fruit and Vegetables</h3>
		</div>
	
		<ul>
			<li class="active">
				<img src="" alt="">
				
				<div class="elements">
					<div class="day">Day 1</div>
					<i class="icon icon-yipp_emoticon_sad"></i>
				</div>

				<div class="data">
					<p>"It went great this day"</p>
				</div>	
			
			</li>
			
			<li class="active">
				<img src="" alt="">
				
				<div class="elements">
					<div class="day">Day 2</div>
					<i class="icon icon-yipp_emoticon_happy-"></i>
				</div>

				<div class="data">
					<p>"It went great this day"</p>
				</div>	
			
			</li>
			
			<li>
		
				
				<div class="elements">
					<div class="day">Day 3</div>
					<i class="icon icon-yipp_emoticon_neutral"></i>
				</div>

				<div class="data">
					<p>"It went great this day"</p>
				</div>	
			
			</li>
			
			<li class="active">
				<img src="" alt="">
				
				<div class="elements">
					<div class="day">Day 4</div>
					<i class="icon icon-yipp_emoticon_happy-"></i>
				</div>

				<div class="data">
					<p>"It went great this day"</p>
				</div>	
			
			</li>
		</ul>
	
	</section>
	
	<div class="restart">
	
	<a href="" >Restart challenge</a>
	
	</div>	
</template>

<script>

</script>