<?xml version='1.0'?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
<xsl:output method='html'/>
<xsl:include href="tags.xslt" />

<xsl:template match="/">
<div id="accordion">
<xsl:apply-templates />
</div>
</xsl:template>

<xsl:template match="project">
<h3><b><xsl:value-of select="@title" /></b> <xsl:apply-templates select="tags" /></h3>
<div>
<xsl:if test="url">
<xsl:variable name="vurl" select="url" />
<a href="{$vurl}"><xsl:value-of select="$vurl" /></a><br />
</xsl:if>

<u>Status:</u><xsl:text>  </xsl:text><xsl:value-of select="status" /><br />
<p><i><xsl:value-of select="about" /></i></p>

<xsl:if test="collab/person">
<u>Collaborators: </u> <br />
<xsl:apply-templates select="collab/person" /> <br />
</xsl:if>
<xsl:if test="boss/person">
<u>Commissioned by:</u> <br />
<xsl:apply-templates select="boss/person" /> <br />
</xsl:if>
<xsl:if test="credits/person">
<u>Credits and Resources:</u> <br />
<xsl:apply-templates select="credits/person" /> <br />
</xsl:if>
<!--<u>Tags:</u><xsl:text>  </xsl:text><xsl:apply-templates select="tags" /> -->
</div>
</xsl:template>

<xsl:template match="*/person">
<xsl:value-of select="@name" />
<xsl:if test="@url">
<xsl:text> [</xsl:text><a href="{@url}">website</a><xsl:text>]</xsl:text>
</xsl:if>
<xsl:if test="@email">
<xsl:text> [</xsl:text><a href="{@email}">e-mail</a><xsl:text>]</xsl:text>
</xsl:if>
<br />
</xsl:template>

</xsl:stylesheet>
