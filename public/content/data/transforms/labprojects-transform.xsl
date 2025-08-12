<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method="html" indent="yes"/>

    <xsl:template match="/projects">
        <div id="projects">
            <xsl:for-each select="section">
                <div id="{@name}" class="mb-3 invisible"></div>
                <h1 class="py-6"><xsl:value-of select="@name"/></h1>
                
                <xsl:for-each select="project">                

                    <div class="my-2 max-w-lg w-full rounded-sm shadow-sm lg:max-w-full lg:flex">
                        
                        <div class="border-r border-b border-r border-gray-400 lg:border-r-0 lg:border-t lg:border-gray-400 bg-white  p-4 flex flex-col justify-between leading-normal">
                            <div class="mb-8">
                            <div class="text-gray-900 font-bold text-xl mb-2"><xsl:value-of select="@name"/></div>
                                <p class="text-gray-700 text-base"><xsl:value-of select="summary"/></p>
                                </div>
                                <div class="flex items-center">
                                <div class="card-footer text-garnet">
                                    <strong>COLLABORATORS</strong>:<span class="text-normal"><xsl:value-of select="collaborators"/></span>
                                </div>
                            </div>
                        </div>

                        <div class="h-64 text-center overflow-hidden bg-contain bg-center flex-none rounded-t bg-cover
                                    lg:w-64 lg:h-auto lg:rounded-t-none lg:rounded-r">
                            <xsl:attribute name="title"><xsl:value-of select="image/@alt"/> </xsl:attribute>
                            <xsl:attribute name="style">background-image: url('https://rbb.union.edu/content<xsl:value-of select="image/@url"/>'); background-postition</xsl:attribute>
                        </div>
                    </div>

                </xsl:for-each>
            </xsl:for-each>
        </div>
    </xsl:template>
</xsl:stylesheet>