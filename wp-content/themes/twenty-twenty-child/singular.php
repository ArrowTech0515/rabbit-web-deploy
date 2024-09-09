<?php
/**
 * The template for displaying single posts and pages.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package WordPress
 * @subpackage Twenty_Twenty
 * @since Twenty Twenty 1.0
 */

get_header();
?>

<main id="site-content">
	<div class="entry-content">
		<div> 
			<div class="recentPost">
				<div class="row">
					<div class="col-md-6"> 
						<div class="homeLatestPost">
						 	<?php
							the_post_thumbnail();

							$caption = get_the_post_thumbnail_caption();

							if ( $caption ) {
								?>

								<figcaption class="wp-caption-text"><?php echo wp_kses_post( $caption ); ?></figcaption>

								<?php
							}
							?>
							<div class="homeLatestPostContent">
								<div class="singleBreadcumb">
									<ul>
										 
                                        <li><a href="blog">Blog  / </a></li>
										<li>
											<?php 
									 			echo the_title( );
											?>
										 </li>
									</ul>
								</div>
								<?php 
						 			echo the_title( '<h3>', '</h3>' );
								?>
								<p>
									<?php echo get_the_date();  ?>
									by 
									<strong>
										<?php 
											$author_id = $post->post_author; 
											the_author_meta( 'user_nicename' , $author_id ); 
										?> 
									</strong>
									in
									<strong>
										<?php  
										   $category = get_the_category();
										   $firstCategory = $category[0]->cat_name; echo $firstCategory;
						                ?>
									</strong>
									
								</p>
							</div>
						</div>
					</div>
				</div>

			</div>
			<div class="row">
				<div class="col-md-8">
					<div class="card">
						<div class="card-body">
							<div class="socialShareBox">
								<span>Share</span>
								<?php echo do_shortcode("[DISPLAY_ULTIMATE_SOCIAL_ICONS]"); ?>
							</div>
							<?php
								if ( is_search() || ! is_singular() && 'summary' === get_theme_mod( 'blog_content', 'full' ) ) {
									the_excerpt();
								} else {
									the_content( __( 'Continue reading', 'twentytwenty' ) );
								}
							?>
							<div class="socialShareBox mb-0 mt-4">
								<span>Share</span>
								<?php echo do_shortcode("[DISPLAY_ULTIMATE_SOCIAL_ICONS]"); ?>
							</div>
						</div>
					</div>
					
				</div>
				<div class="col-md-4" id="sidebar">
					<div class="card">
						<div class="card-body">
							<p>Search</p>
							<?php get_search_form(); ?>
						</div>
					</div>
					<div class="card signupCard">
						<div class="card-body">
							<img src="<?php echo get_theme_file_uri('logoSignup.png'); ?>" width="171" height="51" alt="logo" />
							<div class="py-4">
								The Ideal SEO & Marketing Solution for Small-Medium Businesses.
							</div>
							<a href="https://www.rabbitseo.com/#rabbitSignup" class="btnCustom">Sign Up</a>
						</div>
					</div>

					<div class="card">
						<div class="card-header">
							<h4>Top Article</h4>
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
					<div class="card">
						<div class="card-header">
							<h4>Latest Article</h4>
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
			</div>
		</div>
		
	</div>

	
</main><!-- #site-content -->

<?php get_template_part( 'template-parts/footer-menus-widgets' ); ?>

<?php
get_footer();
