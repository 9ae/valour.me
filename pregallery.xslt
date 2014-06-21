<?xml version='1.0'?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
<xsl:output method='html'/>
<xsl:include href="tags.xslt" />

<xsl:template match="/">
	<div class="loadIndicator">
		<div class="indicator"></div>
	</div>
		<div class="flow">
		<xsl:apply-templates />
		</div>
   <div class="globalCaption"></div>
	<div class="scrollbar">
		<div class="slider"></div>
	</div>
</xsl:template>

<xsl:template match="tiny">
<div class="item">
<xsl:variable name="imgname">
	<xsl:value-of select="img/@actual" />
</xsl:variable>
<img class="content" src="gal/th_{$imgname}" border="0" />
<div class="caption">
	<xsl:value-of select="@title" /><br />
	<b><xsl:text>Credits: </xsl:text></b> <br/>
	<xsl:apply-templates select="credits" />
	<!--<b><xsl:text>Tags:</xsl:text></b>
	<xsl:apply-templates select="tags" />-->
</div>
</div>
</xsl:template>

<xsl:template match="credits">
<xsl:for-each select="org">
<xsl:value-of select="@name" />
<xsl:if test="@url">
<xsl:text> [</xsl:text><a href="{@url}">website</a><xsl:text>]</xsl:text>
</xsl:if>
<xsl:if test="@email">
<xsl:text> [</xsl:text><a href="{@email}">e-mail</a><xsl:text>]</xsl:text>
</xsl:if>
<br />
</xsl:for-each>
</xsl:template>

</xsl:stylesheet>
