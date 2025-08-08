<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method="html" indent="yes"/>
    
    <xsl:template match="/projects">
        <div id="projects">
            <xsl:for-each select="section">
                <div id="{@name}" class="mb-3 invisible"></div>
                <h1 class="text-center mb-2"><xsl:value-of select="@name"/></h1>
                
                <xsl:for-each select="project">
                    <div class="card mb-3 g-0">
                        <div class="card-body">
                            <div class="row">
                                <h3 class="card-title"><xsl:value-of select="@name"/></h3>
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <p class="card-text"><xsl:value-of select="summary"/></p>
                                </div>
                                <div class="col-md-6">
                                    <img class="pull-right img-fluid rounded-start">
                                        <xsl:attribute name="src">content<xsl:value-of select="image/@url"/></xsl:attribute>
                                        <xsl:attribute name="alt">
                                            <xsl:choose>
                                                <xsl:when test="contains(image/@alt, '&lt;-IMG:') and contains(image/@alt, '-&gt;')">
                                                    <xsl:value-of select="substring-before(substring-after(image/@alt, '&lt;-IMG:'), '-&gt;')"/>
                                                </xsl:when>
                                                <xsl:otherwise>
                                                    <xsl:value-of select="image/@alt"/>
                                                </xsl:otherwise>
                                            </xsl:choose>
                                        </xsl:attribute>
                                    </img>
                                </div>
                            </div>
                        </div>
                        <div class="card-footer text-garnet">
                            COLLABORATORS:<span class="mx-1 collaborators"><xsl:value-of select="collaborators"/></span>
                        </div>
                    </div>
                </xsl:for-each>
            </xsl:for-each>
        </div>
    </xsl:template>
</xsl:stylesheet>