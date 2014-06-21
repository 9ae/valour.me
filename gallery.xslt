<?xml version='1.0'?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
<xsl:output method='html'/>
<xsl:include href="tags.xslt" />

<xsl:template match="/">
<xsl:apply-templates />

<center>
<p id="loadingtxt">Loading . . .</p>
</center>
</xsl:template>

<xsl:template match="tiny">
<div class="imgblock">
<xsl:variable name="imgname">
	<xsl:value-of select="img/@actual" />
</xsl:variable>
<img class="thumbnail" src="gal/th_{$imgname}" border="0" />
<div class="caption">
<h4><xsl:value-of select="@title" /></h4>
<p><xsl:value-of select="about" /></p>
	<b><xsl:text>Credits: </xsl:text></b> <br/>
	<xsl:apply-templates select="credits" />
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
