module Jekyll
  class FootnotesBlock < Liquid::Block
    def initialize(tag_name, text, tokens)
      super
    end
    require "kramdown"
    def render(context)
      content = super

      content.scan(/(^(?-mix: {0,3})\[\^((?-mix:\w(?-mix:[\w-])*))\]:\s*?(.*?\n(?-mix:(?:(?-mix:(?>^\s*\n)+)?(?:(?-mix:^(?:\t| {4}))[ \t]*\S.*\n)+(?:(?!(?-mix:^(?-mix: {0,3})(?-mix:\{:(?!:|\/)((?-mix:\\\}|[^\}])+)\}\s*?\n))|(?-mix:^\^\s*?\n)|^(?-mix: {0,3})(?m-ix:<\/(?!(?:a|abbr|acronym|b|big|bdo|br|button|cite|code|del|dfn|em|i|img|input|ins|kbd|label|mark|option|q|rb|rbc|rp|rt|rtc|ruby|samp|select|small|span|strong|sub|sup|tt|u|var|script)\b)(?:[[:alpha:]_:][-[:alnum:]._:]*:)?[[:alpha:]_:][-[:alnum:]._:]*\s*>)|^(?-mix: {0,3})(?-mix:<(?>(?!(?:a|abbr|acronym|b|big|bdo|br|button|cite|code|del|dfn|em|i|img|input|ins|kbd|label|mark|option|q|rb|rbc|rp|rt|rtc|ruby|samp|select|small|span|strong|sub|sup|tt|u|var|script)\b)(?:[[:alpha:]_:][-[:alnum:]._:]*:)?[[:alpha:]_:][-[:alnum:]._:]*)))^[ \t]*\S.*\n)*)*)))/).each do |a|
        content = content.gsub(a[0], generateFootnote(a))
      end

      "#{Kramdown::Document.new(content).to_html}"
    end

    def generateFootnote(context)
      markdown = Kramdown::Document.new("#{context[2].strip}").to_html
      markdown = markdown.gsub('<p>', '')
      markdown = markdown.gsub('</p>', '')

      n = /([0-9]*)/.match(context[1]).to_s

      if n.length > 0 then
        "<li id=\"fn:#{context[1]}\"><p>#{n}: #{markdown}<a href=\"#fnref:#{context[1]}\" class=\"reversefootnote\">↩</a></p></li>"
      else
        "<li><p>#{markdown}</p></li>"
      end
    end
  end
end

Liquid::Template.register_tag('footnotes', Jekyll::FootnotesBlock)
