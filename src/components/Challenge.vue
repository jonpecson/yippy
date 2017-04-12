<template>
	<div id="container">
	
		<div class="header">

			<a href="" class="icon">
				<i class="icon-yipp_profile_line"></i>
			</a>

			<div class="title">Challenge</div>

		</div>

		
		<div class="content">
		
			<div class="panel">
			Lorem Ipsum is simply dummy text of the printing and typesetting industry.
			</div>
			
			<a href="" class="btn">Explore training</a>
		
		</div>

			<ul class="blockList">
				<li>
					<span class="set">
					<i class="icon-yipp_notification_line"></i>
					14:00
					| <i class="icon-yipp_repeat_line"></i>
					Every day
					</span>
					<p>Lorem Ipsum</p>
					
					<i class="arrow icon-yipp_forward"></i>
					
				</li>
				<li>
				<span class="set">
					<i class="icon-yipp_notification_line"></i>
					14:00
					| <i class="icon-yipp_repeat_line"></i>
					Every day
					</span>
					<p>Lorem Ipsum</p>
					
						<i class="arrow icon-yipp_forward"></i>
				</li>
			</ul>		

		<a href="" class="link">Show finished challenges</a>

			<ul class="blockList2">
				<li>
					<p>Lorem Ipsum</p>
					
					<i class="arrow icon-yipp_forward"></i>
					
				</li>
				<li>
					<p>Lorem Ipsum</p>
					
						<i class="arrow icon-yipp_forward"></i>
				</li>
			</ul>

		<footer>
			<ul>
				<li>
					<router-link :to="{ name: 'timeline'}"><span class="icon-yipp_home_full-"></span>Training</router-link>
				</li>
				<li>
					<a href="javascript:void(0);" class="active"><span class="icon-yipp_challenge_line"></span>Challenge</a>
				</li>
			</ul>
		</footer>
		
	</div>	
</template>