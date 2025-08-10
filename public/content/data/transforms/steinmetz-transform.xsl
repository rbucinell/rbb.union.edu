<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    
    <!-- Output method is HTML -->
    <xsl:output method="html" indent="yes" encoding="UTF-8"/>
    
    <!-- Root template -->
    <xsl:template match="/">
        <ul id="steinmetz" class="list">
            <!-- Process each senior project -->
            <xsl:for-each select="steinmetz/symposium">
                <!-- Sort by year descending, then by name -->
                <xsl:sort select="year" order="descending" data-type="number"/>
                <xsl:sort select="name" order="ascending"/>
                <li class="list-row">
                    <span><strong><xsl:value-of select="name"/></strong>,</span>
                    <span>"<xsl:value-of select="title"/>"</span>
                    <span><xsl:value-of select="year"/></span>
                </li>
            </xsl:for-each>
        </ul>
    </xsl:template>    
</xsl:stylesheet>