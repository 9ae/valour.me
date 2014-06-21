<?php

$name = $_GET['k'];

$xdoc = new DomDocument;
$xp = new XsltProcessor();
$xdoc->load($name.'.xslt');
$xp->importStylesheet($xdoc);
$xdoc->load($name.'.xml');

 if ($html = $xp->transformToXML($xdoc)) {
      echo $html;
  } else {
      trigger_error('XSL transformation failed.', E_USER_ERROR);
  }

?>
