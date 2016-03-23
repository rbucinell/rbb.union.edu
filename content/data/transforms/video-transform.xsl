<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output method="html"/>
<xsl:template match="/">
  <ul class="C">
    <xsl:for-each select="videos/Category">
      <li>
        <a href="#"><xsl:value-of select="@name"/></a>
        
        <!--If it contains a topic, then we'll add the ul -->
        <xsl:if test="Topic">
          <ul class="T">
            <xsl:for-each select="Topic">
              <li>
                <a href="#"><xsl:value-of select="@name"/></a>                
                <!--If it contains a video, then we'll add the ul -->
                <xsl:if test="Video">
                  <ul class="V">
                    <!-- Add the video with the href-->
                    <xsl:for-each select="Video">                
                      <li>
                        <!--Construct the anchor tag-->
						<xsl:element name="a">
                          <xsl:attribute name="href">
                            <xsl:if test="not(contains(@link,'http')) and not(contains(@link,'www'))">
                              <xsl:text disable-output-escaping="no">data/videos/</xsl:text>
                            </xsl:if>
                            <xsl:value-of select="@link"/>
                          </xsl:attribute>
                          <xsl:value-of select="@name"/>
                        </xsl:element>
                      </li>
                    </xsl:for-each>
                  </ul>
                </xsl:if>
              </li>
            </xsl:for-each>
          </ul>
        </xsl:if>
      </li>
    </xsl:for-each>
  </ul>
</xsl:template>
</xsl:stylesheet>

