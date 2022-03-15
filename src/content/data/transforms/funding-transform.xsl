<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output method="html"/>
<xsl:template match="/">
	<div class="content-block">
		<h2> Funding While at Union College (<small><xsl:value-of select="format-number(sum(//Amount), '$#,#00')" /></small>)</h2>
	</div>
	<table id="funding" class="table table-condensed table-hover table-striped table-bordered table-responsive border-garnet bg-white">
		<thead class="text-garnet" style="background-color: var(--rbb-lightest-gray)">
			<tr>
				<th>Year</th>
				<th>Amount</th>
				<th>Source of Funding</th>
				<th>Title</th>
			</tr>
		</thead>
		<tbody>

			<xsl:for-each select="funding-list/fund">
				<tr>
					<td><xsl:value-of select="Year" /></td>
					<td><xsl:value-of select='format-number(Amount,"$###,###")' /></td>
					<td><xsl:value-of select="Source" /></td>
					<td><xsl:value-of select="Title" /></td>
				</tr>
			</xsl:for-each>
		</tbody>
	</table>
</xsl:template>
</xsl:stylesheet>
