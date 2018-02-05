<?php
	$username = $_GET['username'];
?>

<script>
	let s = <?php echo "$username";?>;
	alert(s);
	top.foo(s);
</script>