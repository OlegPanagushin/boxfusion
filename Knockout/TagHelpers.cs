using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.AspNetCore.Razor.TagHelpers;

namespace Knockout
{
    public class RegionSelectorTagHelper : TagHelper
    {
        public ModelExpression AspFor { get; set; }

        /// <summary>
        /// Name of client validation function
        /// </summary>
        public string ClientCountryValidation { get; set; }

        /// <summary>
        /// Name of client validation function
        /// </summary>
        public string ClientRegionValidation { get; set; }

        public string Value { get; set; }

        public override void Process(
            TagHelperContext context,
            TagHelperOutput output
            )
        {
            output.TagName = "region-selector";

            var formName = AspFor != null ? AspFor.Name : string.Empty;
            output.Attributes.SetAttribute(
                "params",
                $"countryValidation: {ClientCountryValidation}, regionValidation: {ClientRegionValidation}, formName: '{formName}', value: '{Value}'"
            );
        }
    }
}
