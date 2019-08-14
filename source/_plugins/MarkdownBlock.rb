module Jekyll
  class MarkdownBlock < Liquid::Block
    def initialize(tag_name, text, tokens)
      super
    end

    require "kramdown"
    def render(context)
      content = super
      
      content.scan(/(\[\^([0-9]+){0,3}\][^:])/).each do |a|
        content = content.gsub(a[0], generateSup(a[1]))
      end

      "#{Kramdown::Document.new(content).to_html}"
    end

    def generateSup(number)
     "<sup id=\"fnref:#{number}\" style=\"padding-right:8px;\"><a href=\"#fn:#{number}\" class=\"footnote\">#{number}</a></sup>"
    end
  end
end

Liquid::Template.register_tag('markdown', Jekyll::MarkdownBlock)
