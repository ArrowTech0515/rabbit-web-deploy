<?php /* Template Name: HomePage */ 
get_header();
?>
<main id="site-content"> 
	<div class="entry-content">
		<div class="recentPost">
			<div class="row">
				<?php
				    $args = array( 'numberposts' => '5' ,'meta_key' => '_is_ns_featured_post', 'meta_value' => 'yes');
				    $recent_posts = wp_get_recent_posts( $args );
				    // echo "<pre>";
				    // print_r($recent_posts);
				    // echo "string";
				    // die();
				    foreach( $recent_posts as $recent ){
				    	?>
				    	<div class="col-md-6">
				    		<div class="homeLatestPost">
				    			 
				    				<?php 
			    					 if ( has_post_thumbnail( $recent["ID"]) ) {
									      echo  get_the_post_thumbnail($recent["ID"],'large');
									    }
			    					?>
				    				<div class="homeLatestPostContent">
				    					<p><?php echo date('M d , Y', strtotime($recent['post_date']));  ?></p>
				    					
				    					<h3><a  href="https://blog.rabbitseo.com/<?php echo $recent["post_name"];  ?>"><?php echo $recent["post_title"];  ?></a></h3>
				    					<div class="homeLatestPostDescription">
				    						<?php 
					    						$excerpt= $recent["post_content"]; 
												echo wp_trim_words($excerpt,  30); 
					    					?> 
				    					</div>
				    					<a class="readMoreBtn" href="https://blog.rabbitseo.com/<?php echo $recent["post_name"];  ?>">Read More</a>
				    				</div> 
				    			 
				    		</div>
				    	</div>
				      
				<?php
				    }
				?>
			</div>
		</div> 

		<!-- latest post -->
		<div class="latestPost">
			<div class="row">
				<div class="col-md-6">
					<div class="card">
						<div class="card-header">
							<h4>Latest Articles</h4>
						</div>
						<div class="card-body">
							<div class="sliderList">
								<?php
								    $args = array( 'numberposts' => '15' );
								    $recent_posts = wp_get_recent_posts( $args );
								    // echo "<pre>";
								    // print_r($recent_posts);
								    // echo "string";
								    // die();
								    foreach( $recent_posts as $recent ){
								 ?>
								    <div class="sliderListItem">
								    	<div class="sliderListItemContent">
								    		<?php 
				    					    if ( has_post_thumbnail( $recent["ID"]) ) {
										      echo  get_the_post_thumbnail($recent["ID"],'large');
											    }
					    					?>
					    					<div class="homeLatestPostContent"> 
						    					<h3><a href="https://blog.rabbitseo.com/<?php echo $recent["post_name"];  ?>"><?php echo $recent["post_title"];  ?></a></h3>
						    					 <p><?php echo date('M d , Y', strtotime($recent['post_date']));  ?></p>
						    					
						    				</div>
						    				<a class="readMoreBtn" href="https://blog.rabbitseo.com/<?php echo $recent["post_name"];  ?>">Read More</a>
								    	</div> 
								    </div>
							    <?php
								    }
								?>
							</div> 
						</div>
					</div>
				</div>
				<div class="col-md-6">
					<div class="card">
						<div class="card-header">
							<h4>Top Articles</h4>
						</div>
						<div class="card-body topPostList">
							<div class="sliderList sliderTopList">
								<?php 
								   $cat_posts = get_posts(array(
										'posts_per_page' => -1,
										'category_name' => 'top-article',
										'order' => 'DESC'
									));
								    if ($cat_posts) :
    								foreach ($cat_posts as $post) : setup_postdata($post);
								 ?>
								    <div class="sliderListItem"> 
								    	<div class="sliderListItemContent">
					    					<div class="homeLatestPostContent"> 
						    					<h3><a href="<?php the_permalink(); ?>"><?php the_title();  ?></a></h3>
						    					 <p><?php echo get_the_date('M d , Y'); ?></p>
						    					
						    				</div>
						    				<a class="readMoreBtn" href="<?php the_permalink(); ?>">Read More</a>
						    			</div>
								    </div>
							    <?php
								   endforeach;
										wp_reset_postdata(); // Restore global post data
									else :
										echo 'No posts found';
									endif;
								?>
							</div> 
						</div>
					</div>
				</div>
			</div>
			
		</div>
	</div> 
</main>
<?php get_template_part( 'template-parts/footer-menus-widgets' ); ?>

<?php
	get_footer();
?>