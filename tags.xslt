<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">

<xsl:template match="mist">
<div id="tagcloud">
    <xsl:for-each select="tag">
        <xsl:variable name="tagname" select="@name" />
        <input type="checkbox" id="tag_{$tagname}" />
        <label for="tag_{$tagname}"><xsl:value-of select="$tagname"  /></label>
    </xsl:for-each>
</div>
</xsl:template>

<xsl:template match="tags">
<span class="taglist">
<xsl:for-each select="tag">
<xsl:variable name="tagname" select="@name" />
<!--a href="#" onclick="filtertag('{$tagname}',1);" code="{$tagname}" style="padding:2px" -->
<span class="tagblock"><xsl:text>{</xsl:text>
<xsl:value-of select="$tagname" />
<xsl:text>}</xsl:text>
</span>
</xsl:for-each>
</span>
</xsl:template>
</xsl:stylesheet>
