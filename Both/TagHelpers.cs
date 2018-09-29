using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.AspNetCore.Razor.TagHelpers;

namespace Both
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

    public class ReactRegionSelectTagHelper : TagHelper
    {
        public ModelExpression AspFor { get; set; }

        /// <summary>
        /// Name of client validation function
        /// </summary>
        public string CustomValidation { get; set; }

        public string Value { get; set; }

        public override void Process(
            TagHelperContext context,
            TagHelperOutput output
            )
        {
            output.TagName = "react-region-select";
            output.Attributes.SetAttribute("data-app-required", true);
            output.Attributes.SetAttribute("data-app-form-name", AspFor != null ? AspFor.Name : string.Empty);
            output.Attributes.SetAttribute("data-app-custom-validation", CustomValidation);
        }
    }
}
